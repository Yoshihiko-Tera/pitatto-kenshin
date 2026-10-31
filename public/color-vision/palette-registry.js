// Photo-inspired practice colors, chosen visually; no colorimetric or clinical validation.
export const paletteRegistry = {
 provisional: {label:'緑の背景・橙の図柄',validated:false,foreground:['#c77b50','#d58b59','#b57448','#c99862','#b98658'],background:['#8c995f','#a5a975','#75885c','#a4a178','#8d946d']},
 'green-purple': {label:'緑の背景・紫の図柄',validated:false,foreground:['#9c8294','#ae929f','#89788d','#b69b9d'],background:['#639b7c','#79ad8e','#528d70','#89b599']},
 'rose-blue': {label:'赤茶の背景・青緑の図柄',validated:false,foreground:['#5d9fac','#74b1b8','#4e919f','#79a99c'],background:['#b68478','#c69a85','#a77976','#cba28d']},
 'orange-green': {label:'橙の背景・緑の図柄',validated:false,foreground:['#6d9e70','#8fa557','#4f987c','#a2b867'],background:['#dda05d','#e8b15f','#cb8960','#e2a376']},
 'green-orange': {label:'青緑の背景・橙の図柄',validated:false,foreground:['#ee8a49','#e77b40','#f09d57','#db7844'],background:['#6ca18a','#7aac97','#5d947f','#88b19a']},
 // Explicit lightness contrast is intentional for teaching the response format only.
 'intro-clear': {label:'導入用・くっきり',validated:false,introOnly:true,foreground:['#163f59','#19465e','#204c65'],background:['#e1e8e1','#d6e0d8','#e9ede5']},
};
export const practicePaletteIds=['green-purple','rose-blue','orange-green','green-orange'];
