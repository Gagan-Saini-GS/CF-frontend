function checkNumber(str) {
  if (str === undefined) {
    return "-1";
  }

  if (str[0] >= "0" && str[0] <= "9") {
    let ans = 0;
    for (let i = 0; i < str.length; i++) {
      ans = ans * 10 + (str[i] - "0");
    }

    return ans;
  } else {
    return "-1";
  }
}

export default checkNumber;
