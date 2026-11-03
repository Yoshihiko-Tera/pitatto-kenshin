// Practice-only hue variations, matched to intro-clear luminance.
// These teach the response format, never clinical visibility thresholds.
export const paletteRegistry = {
 // Midway teaching contrast between the clear demo and former low-contrast plates.
 'intro-mid': {label:'説明用・中間の見やすさ',validated:false,introOnly:true,foreground:['#587183','#617b8d','#6b8596'],background:['#bac6ba','#b2c0b5','#c2ccc0']},
 'intro-mono': {label:'説明用・白黒',validated:false,introOnly:true,foreground:['#303c39','#35413e','#3a4643'],background:['#e4e8e5','#dce2dd','#e9ede8']},
 provisional: {label:'緑の背景・橙の図柄',validated:false,foreground:['#c77b50','#d58b59','#b57448','#c99862','#b98658'],background:['#8c995f','#a5a975','#75885c','#a4a178','#8d946d']},
 'green-purple': {label:'緑の背景・紫の図柄',validated:false,foreground:['#453841','#4b3e44','#4f4451','#44393a'],background:['#e0e8e3','#d3e1d8','#e8edea','#dfe9e2']},
 'rose-blue': {label:'赤茶の背景・青緑の図柄',validated:false,foreground:['#224046','#2b4649','#274d55','#2b403a'],background:['#ede4e3','#e9dbd5','#f0eaea','#eee4e0']},
 'orange-green': {label:'橙の背景・緑の図柄',validated:false,foreground:['#2a412c','#3b4621','#264f40','#363f1f'],background:['#f4e3d8','#f3d9bf','#f4eae6','#f5e3d9']},
 'green-orange': {label:'青緑の背景・橙の図柄',validated:false,foreground:['#5a3116','#673417','#653f20','#5d2f18'],background:['#e0e8e4','#d4e0da','#e8edeb','#e0e8e3']},
 // Explicit lightness contrast is intentional for teaching the response format only.
 'intro-clear': {label:'導入用・くっきり',validated:false,introOnly:true,foreground:['#163f59','#19465e','#204c65'],background:['#e1e8e1','#d6e0d8','#e9ede5']},
};
export const practicePaletteIds=['green-purple','rose-blue','orange-green','green-orange'];
