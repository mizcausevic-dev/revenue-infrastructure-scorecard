$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7,10,15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233,243,255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186,200,218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55,255,139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25,199,255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Revenue Infrastructure Scorecard", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic proof render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ProofImage -Title "Revenue infrastructure score at a glance" -Subtitle "Pipeline trust, routing risk, attribution confidence, and recoverable value stay visible in one executive surface." -Bullets @(
  "Integrity score keeps the board focused on decision-safe revenue systems, not dashboard theater.",
  "Revenue at risk and recoverable value sit next to broken-system count, not hidden in ops backlog.",
  "The scorecard is built for CFO, CRO, and investor review, not only operator debugging."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ProofImage -Title "Revenue lane stays board-readable" -Subtitle "Capture, routing, reporting, and forecasting lanes stay separate so leadership can invest in the right repair path." -Bullets @(
  "Routing delay and named-account drift surface before the next growth update.",
  "Attribution and measurement claims are forced back to current proof.",
  "Forecasting shadow systems stop hiding inside heroic spreadsheet stories."
) -OutputPath (Join-Path $screenshots "02-revenue-lane-proof.png")

New-ProofImage -Title "System risks sort by executive severity" -Subtitle "The biggest trust and leakage risks surface first with clear owners, vendors, and system names." -Bullets @(
  "Attribution blind spots and routing delay move to the top immediately.",
  "Reporting trust, warehouse latency, and martech sprawl remain visible as follow-on work.",
  "The scorecard keeps vendor language tied to real evidence, not confidence theater."
) -OutputPath (Join-Path $screenshots "03-system-risks-proof.png")

New-ProofImage -Title "Investment priorities resolve into board packets" -Subtitle "Every major repair path becomes a memo-ready packet with blocker, owner, and timing window." -Bullets @(
  "Attribution reset becomes a CFO-readable budget and proof decision.",
  "Routing and forecast packets show where revenue confidence is still overstated.",
  "The board memo can reuse the same packets instead of inventing new slide language."
) -OutputPath (Join-Path $screenshots "04-investment-priorities-proof.png")
