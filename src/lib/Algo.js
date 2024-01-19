function computeLPSArray(pat) {
  const M = pat.length;
  const lps = Array(M).fill(0);
  let len = 0;
  let i = 1;

  while (i < M) {
    if (pat[i] === pat[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

function KMPSearch(pat, txt) {
  const M = pat.length;
  const N = txt.length;
  const lps = computeLPSArray(pat);
  const indices = [];

  let i = 0; // index for txt
  let j = 0; // index for pat

  while (i < N) {
    if (pat[j] === txt[i]) {
      i++;
      j++;
    }

    if (j === M) {
      // Pattern found at index i - j
      indices.push(i - j);
      j = lps[j - 1];
    } else if (i < N && pat[j] !== txt[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  if (indices.length === 0) {
    return null;
  }
  return indices;
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
