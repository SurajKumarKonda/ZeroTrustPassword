function KMPSearch(pat, txt) {
  pat = pat.toLowerCase(); // Convert pattern to lowercase
  txt = txt.toLowerCase(); // Convert text to lowercase
  const M = pat.length;
  const N = txt.length;
  const lps = new Array(M).fill(0);
  computeLPSArray(pat, M, lps);

  let i = 0,
    j = 0;
  while (i < N) {
    if (pat[j] === txt[i]) {
      i++;
      j++;
    }

    if (j === M) {
      //console.log("Your password contains personal information at position", i - j);
      return 1;
    } else if (i < N && pat[j] !== txt[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  return 0;
}

function computeLPSArray(pat, M, lps) {
  let length = 0;
  lps[0] = 0;
  let i = 1;
  while (i < M) {
    if (pat[i] === pat[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
}

// Example usage:
const txt = ["Suraj", "Kumar", "Suraj", "26", "09", "2004", "Sailaja", "Kumar"];
let txt2 = [];
let max = txt.length;
for (let i = 0; i < max; i++) {
  if (i === "nan") {
    break;
  } else {
    for (let j = 0; j < txt[i].length - 1; j++) {
      const x = txt[i][j];
      const y = txt[i][j + 1];
      txt2.push(x + y);
    }
  }
}

export default KMPSearch;

//   console.log(txt2)
//   const password = "2004Suraj"
//   txt2.forEach((t) => {
//       console.log(t)
//       console.log( KMPSearch(t,password))
//   })
// const indices = KMPSearch(pat, txt);

// console.log("Pattern found at indices:", indices);
