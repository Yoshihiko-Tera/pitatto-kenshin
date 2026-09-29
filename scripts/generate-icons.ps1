param(
  [string]$OutputDirectory = (Join-Path $PSScriptRoot "..\public")
)

Add-Type -AssemblyName System.Drawing

function New-AppIcon([int]$Size, [string]$FileName) {
  $scale = $Size / 256.0
  $bitmap = [System.Drawing.Bitmap]::new($Size, $Size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.Color]::FromArgb(15, 118, 110))
  $graphics.ScaleTransform($scale, $scale)

  $white = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
  $mint = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(204, 251, 241))
  $yellow = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(250, 204, 21))
  $dark = [System.Drawing.Color]::FromArgb(19, 78, 74)
  $amber = [System.Drawing.Color]::FromArgb(245, 158, 11)
  $lightMint = [System.Drawing.Color]::FromArgb(153, 246, 228)

  $graphics.FillEllipse($yellow, 180, 24, 50, 50)
  $graphics.FillRectangle($white, 45, 60, 132, 129)
  $graphics.FillEllipse($white, 45, 38, 46, 46)
  $graphics.FillEllipse($white, 131, 38, 46, 46)
  $graphics.FillEllipse($white, 45, 166, 46, 46)
  $graphics.FillEllipse($white, 131, 166, 46, 46)
  $graphics.FillRectangle($mint, 80, 27, 63, 29)

  $round = [System.Drawing.Drawing2D.LineCap]::Round
  $checkPen = [System.Drawing.Pen]::new($amber, 15)
  $checkPen.StartCap = $round; $checkPen.EndCap = $round; $checkPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $graphics.DrawLines($checkPen, @([System.Drawing.Point]::new(76,105), [System.Drawing.Point]::new(93,122), [System.Drawing.Point]::new(128,83)))
  $linePen = [System.Drawing.Pen]::new($lightMint, 12)
  $linePen.StartCap = $round; $linePen.EndCap = $round
  $graphics.DrawLine($linePen, 76,151,134,151); $graphics.DrawLine($linePen, 76,177,114,177)
  $tubePen = [System.Drawing.Pen]::new($dark, 13)
  $tubePen.StartCap = $round; $tubePen.EndCap = $round
  $graphics.DrawLine($tubePen,176,90,176,138); $graphics.DrawArc($tubePen,123,128,53,52,0,90); $graphics.DrawLine($tubePen,149,180,129,180)
  $earPen = [System.Drawing.Pen]::new([System.Drawing.Color]::White, 13)
  $earPen.StartCap = $round; $earPen.EndCap = $round
  $graphics.DrawLine($earPen,159,88,159,104); $graphics.DrawArc($earPen,159,87,34,34,0,180); $graphics.DrawLine($earPen,193,88,193,104)
  $graphics.FillEllipse($yellow,107,162,36,36)
  $circlePen = [System.Drawing.Pen]::new($dark,10); $graphics.DrawEllipse($circlePen,107,162,36,36)
  $graphics.FillEllipse($white,119,174,12,12)

  $graphics.ResetTransform()
  $graphics.Dispose()
  $bitmap.Save((Join-Path $OutputDirectory $FileName), [System.Drawing.Imaging.ImageFormat]::Png)
  $bitmap.Dispose()
  @($white,$mint,$yellow,$checkPen,$linePen,$tubePen,$earPen,$circlePen) | ForEach-Object { $_.Dispose() }
}

New-AppIcon 192 "icon-192-v3.png"
New-AppIcon 512 "icon-512-v3.png"
New-AppIcon 180 "apple-touch-icon-v3.png"
