# Cursor.js 
# A fancy cursor for your website
# GitHub: https:///www.github.com/cursor.js
# Licence: GNU General Public License v3.0
# By: 0x4248
#
# minify.py
# Minify the cursor.js file to cursor.min.js

file = open("js/cursor.js", "r")
js = file.read()
file.close()

replaceFind = ["cursor =", "cursor.", "cursorInner =", "cursorInner.", "innerCursorPos", "tooltipEnabled", "scrollTimer", "showTooltip(text)", "updateTooltip(text)", "c.innerHTML = text;", "targetPos", "scrollTimer", "logVersion"]
replaceTo = ["c=", "c.", "cI=", "cI.", "iCP", "tE", "sT", "showTooltip(t)", "updateTooltip(t)", "c.innerHTML = t;", "tP", "sT", "lV"]

def replaceFromMap(file, replaceFind, replaceTo):
    for i in range(len(replaceFind)):
        file = file.replace(replaceFind[i], replaceTo[i])
    return file

def preClean(file):
    file = file.split("\n")
    file = file[7:]
    file = "\n".join(file)
    file = file.replace("\n", "")
    file = file.replace("\t", "")
    return file

def removeSpaces(file):
    file = file.split("=")
    for i in range(len(file)):
        file[i] = file[i].strip()
    file = "=".join(file)

    file = file.split(">")
    for i in range(len(file)):
        file[i] = file[i].strip()
    file = ">".join(file)

    file = file.split("<")
    for i in range(len(file)):
        file[i] = file[i].strip()
    file = "<".join(file)

    file = file.replace("if (", "if(")
    file = file.replace("else {", "else{")
    file = file.replace("} else", "}else")
    file = file.replace(") {", "){")
    file = file.replace("} {", "}{")
    file = file.replace(", (", ",(")
    file = file.replace(" +", "+")
    file = file.replace("+ ", "+")
    file = file.replace(" -", "-")
    file = file.replace("- ", "-")
    file = file.replace(" *", "*")
    file = file.replace("* ", "*")
    return file

js = preClean(js)
js = replaceFromMap(js, replaceFind, replaceTo)
js = removeSpaces(js)
file = open("js/cursor.min.js", "w")
file.write(js)
file.close()
