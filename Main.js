let str1 = "abcd";
let str2 = "cbac";

const arr1 = [], arr2 = [];

for (let i = 0; i <str1.length; i++) {
    const ch = str1[i];
    if (ch != ' ') {
        arr1[ch-'a'] ++;
    }
}

for (let i = 0; i <str2.length; i++) {
    const ch = str2[i];
    if (ch != ' ') {
        arr2[ch-'a'] ++;
    }
}
console.log(arr1);
console.log(arr2);

let i = 0;
for (i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) { 
        console.log("NO"); 
        break;
    }    
}
if (i == arr1.length) {
    console.log("YES");
}
