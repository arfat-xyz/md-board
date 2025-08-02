{
"javascript.format.semicolons": "insert",
"typescript.format.semicolons": "insert",
"emmet.preferences": {},
"emmet.includeLanguages": {
"javascript": "javascriptreact"
},
"files.associations": {
"\*.js": "javascriptreact"
},
"material-icon-theme.files.associations": {},
"[javascriptreact]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"editor.formatOnSave": true,
"eslint.codeActionsOnSave.rules": null,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"terminal.integrated.defaultProfile.windows": "Git Bash",
"files.autoSave": "afterDelay",
"editor.codeActionsOnSave": {
"source.fixAll.eslint": "explicit"
},
"eslint.validate": ["javascript"],
"editor.indentSize": "tabSize",
"editor.tabSize": 2,
"workbench.colorCustomizations": {
"editorUnnecessaryCode.border": "#dd7aab"
},
"window.zoomLevel": 1,
"[sql]": {
"editor.defaultFormatter": "cweijan.vscode-postgresql-client2"
},
"editor.fontFamily": "Fira Code",
"editor.fontLigatures": true,
"editor.cursorSmoothCaretAnimation": "on",
"editor.cursorBlinking": "expand",
"terminal.integrated.env.windows": {},
"terminal.integrated.fontFamily": "monospace",
"console-ninja.featureSet": "Community",
"files.autoSaveDelay": 60000,
"typescript.updateImportsOnFileMove.enabled": "always",
"[prisma]": {
"editor.defaultFormatter": "Prisma.prisma"
},
"[typescript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"git.openRepositoryInParentFolders": "never",
"database-client.autoSync": true,
"git.autofetch": true,
"[snippets]": {
"editor.defaultFormatter": "vscode.json-language-features"
},
"editor.detectIndentation": false,
"editor.tokenColorCustomizations": {
"textMateRules": [
{
"scope": "markup.bold.markdown",
"settings": {
"foreground": "#FF0000", // Red color
"fontStyle": "bold"
}
}
]
},
"workbench.settings.applyToAllProfiles": [],
"security.workspace.trust.untrustedFiles": "open",
"code-runner.executorMap": {
"javascript": "node",
"java": "cd $dir && javac $fileName && java $fileNameWithoutExt",
    "c": "cd $dir && gcc $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
"zig": "zig run",
"cpp": "cd $dir && g++ $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
"objective-c": "cd $dir && gcc -framework Cocoa $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
"php": "php",
"python": "python -u",
"perl": "perl",
"perl6": "perl6",
"ruby": "ruby",
"go": "go run",
"lua": "lua",
"groovy": "groovy",
"powershell": "powershell -ExecutionPolicy ByPass -File",
"bat": "cmd /c",
"shellscript": "bash",
"fsharp": "fsi",
"csharp": "scriptcs",
"vbscript": "cscript //Nologo",
"typescript": "ts-node",
"coffeescript": "coffee",
"scala": "scala",
"swift": "swift",
"julia": "julia",
"crystal": "crystal",
"ocaml": "ocaml",
"r": "Rscript",
"applescript": "osascript",
"clojure": "lein exec",
"haxe": "haxe --cwd $dirWithoutTrailingSlash --run $fileNameWithoutExt",
    "rust": "cd $dir && rustc $fileName && $dir$fileNameWithoutExt",
"racket": "racket",
"scheme": "csi -script",
"ahk": "autohotkey",
"autoit": "autoit3",
"dart": "dart",
"pascal": "cd $dir && fpc $fileName && $dir$fileNameWithoutExt",
"d": "cd $dir && dmd $fileName && $dir$fileNameWithoutExt",
"haskell": "runghc",
"nim": "nim compile --verbosity:0 --hints:off --run",
"lisp": "sbcl --script",
"kit": "kitc --run",
"v": "v run",
"sass": "sass --style expanded",
"scss": "scss --style expanded",
"less": "cd $dir && lessc $fileName $fileNameWithoutExt.css",
    "FortranFreeForm": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
"fortran-modern": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
"fortran_fixed-form": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
"fortran": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
"sml": "cd $dir && sml $fileName",
"mojo": "mojo run",
"erlang": "escript",
"spwn": "spwn build",
"pkl": "cd $dir && pkl eval -f yaml $fileName -o $fileNameWithoutExt.yaml",
"gleam": "gleam run -m $fileNameWithoutExt"
}
}

aaron-bond.better-comments
adpyke.codesnap
bradlc.vscode-tailwindcss
christian-kohler.npm-intellisense
christian-kohler.path-intellisense
cweijan.dbclient-jdbc
cweijan.vscode-postgresql-client2
danny1461.css-semicolon-fix
dbaeumer.vscode-eslint
dsznajder.es7-react-js-snippets
eamodio.gitlens
ecmel.vscode-html-css
esbenp.prettier-vscode
formulahendry.auto-close-tag
formulahendry.code-runner
formulahendry.vscode-mysql
jasonnutter.search-node-modules
jawandarajbir.react-vscode-extension-pack
ms-azuretools.vscode-azureappservice
ms-azuretools.vscode-azureresourcegroups
ms-azuretools.vscode-azurestaticwebapps
ms-azuretools.vscode-containers
ms-azuretools.vscode-docker
ms-edgedevtools.vscode-edge-devtools
ms-python.debugpy
ms-python.python
ms-python.vscode-pylance
ms-python.vscode-python-envs
ms-toolsai.jupyter
ms-toolsai.jupyter-keymap
ms-toolsai.jupyter-renderers
ms-toolsai.vscode-jupyter-cell-tags
ms-toolsai.vscode-jupyter-slideshow
ms-vscode-remote.remote-wsl
nextnav.nextnav
pkief.material-icon-theme
prisma.prisma
ritwickdey.liveserver
rodrigovallades.es7-react-js-snippets
rvest.vs-code-prettier-eslint
seyyedkhandon.firacode
tomoki1207.pdf
wallabyjs.console-ninja
wix.vscode-import-cost
xabikos.javascriptsnippets
xabikos.reactsnippets
