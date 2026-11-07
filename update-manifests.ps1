# 自动扫描 problem/ 与 lesson/ 下的题目、课程页面，
# 提取页面内部信息（标题、难度/状态）生成 manifest.js 供列表页渲染。
# 新增或修改题目/课程后，双击或右键“使用 PowerShell 运行”本脚本即可更新列表。

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

# ===== 题目清单 =====
$problems = @()
Get-ChildItem "$root/problem" -Filter *.html | ForEach-Object {
    $c = Get-Content $_.FullName -Raw -Encoding UTF8
    # 去掉HTML注释，避免把注释里的示例代码当成内容提取
    $c = $c -replace '(?s)<!--.*?-->', ''
    $h1 = [regex]::Match($c, "<h1>(.*?)</h1>").Groups[1].Value.Trim()
    if (-not $h1) { return }
    # 提取标签区的所有 tag-item（没有则为空数组）
    $tags = @([regex]::Matches($c, 'class="tag-item">([^<]*)</span>') | ForEach-Object { $_.Groups[1].Value.Trim() })
    # 题号与题名分别从 h1 内的 span.pid / span.pname 提取
    $probId = [regex]::Match($c, '<span class="pid">(.*?)</span>').Groups[1].Value.Trim()
    $name = [regex]::Match($c, '<span class="pname">(.*?)</span>').Groups[1].Value.Trim()
    if (-not $probId) {
        # 兼容旧格式：标题第一个空格前的部分作为题号
        $probId = ($h1 -split "\s+")[0]
        $name = if ($h1 -match "^\S+\s+(.*)$") { $Matches[1].Trim() } else { $h1 }
    }
    $problems += [ordered]@{
        file = $_.Name; pid = $probId; name = $name; tags = $tags
    }
}
$js = "// 由 update-manifests.ps1 自动生成，请勿手改`r`nwindow.PROBLEM_MANIFEST = " +
      (ConvertTo-Json -InputObject $problems -Depth 5) + ";"
Set-Content "$root/problem/manifest.js" $js -Encoding UTF8

# ===== 课程清单 =====
$lessons = @()
Get-ChildItem "$root/lesson" -Filter *.html | ForEach-Object {
    $c = Get-Content $_.FullName -Raw -Encoding UTF8
    $c = $c -replace '(?s)<!--.*?-->', ''
    $h1 = [regex]::Match($c, "<h1>(.*?)</h1>").Groups[1].Value.Trim()
    if (-not $h1) { return }
    $status = [regex]::Match($c, "状态：([^<]*)").Groups[1].Value.Trim()
    # 课时名与课程名分别从 h1 内的 span.lid / span.lname 提取
    $lessonId = [regex]::Match($c, '<span class="lid">(.*?)</span>').Groups[1].Value.Trim()
    $name = [regex]::Match($c, '<span class="lname">(.*?)</span>').Groups[1].Value.Trim()
    if (-not $lessonId) {
        # 兼容旧格式：标题第一个空格前的部分作为课时名
        $lessonId = ($h1 -split "\s+")[0]
        $name = if ($h1 -match "^\S+\s+(.*)$") { $Matches[1].Trim() } else { $h1 }
    }
    $statusClass = if ($status -like "*完结*") { "done" } else { "" }
    $lessons += [ordered]@{
        file = $_.Name; lid = $lessonId; name = $name; status = $status; statusClass = $statusClass
    }
}
$js2 = "// 由 update-manifests.ps1 自动生成，请勿手改`r`nwindow.LESSON_MANIFEST = " +
       (ConvertTo-Json -InputObject $lessons -Depth 5) + ";"
Set-Content "$root/lesson/manifest.js" $js2 -Encoding UTF8

Write-Host "已更新 problem/manifest.js（$($problems.Count) 题）与 lesson/manifest.js（$($lessons.Count) 课）"
