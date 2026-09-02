$images = Get-ChildItem -Path . -Recurse -File | Where-Object {
    $_.Extension -match '\.(jpg|jpeg|png|webp|gif)$'
}

foreach ($html in Get-ChildItem -Path . -Filter *.html) {

    $content = Get-Content $html.FullName -Raw

    $content = [regex]::Replace(
        $content,
        '/_next/image\?url=%2Fassets%2F([^&"]+)(?:&amp;|&)w=[^"]*(?:&amp;|&)?q=[^"]*',
        {
            param($match)

            $requested = [System.Uri]::UnescapeDataString($match.Groups[1].Value)
            $baseName = [System.IO.Path]::GetFileNameWithoutExtension($requested)

            $found = $images | Where-Object {
                $localBase = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
                $localBase -like "$baseName*"
            } | Select-Object -First 1

            if ($found) {
                return "/_next/$($found.Name)"
            }

            return $match.Value
        }
    )

    Set-Content $html.FullName $content -NoNewline

    Write-Host "Processed: $($html.Name)"
}

Write-Host ""
Write-Host "IMAGE FIX COMPLETE"
