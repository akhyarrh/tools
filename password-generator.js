document.addEventListener("DOMContentLoaded", function () {
  function generatePassword() {
    // Define the character sets
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numericChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // Combine the character sets
    const allChars =
      lowercaseChars + uppercaseChars + numericChars + symbolChars;

    // Generate the password
    let password = "";
    for (let i = 0; i < 14; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Ensure the password contains at least one of each required character type
    const passwordArray = password.split("");
    passwordArray.splice(
      Math.floor(Math.random() * 14),
      1,
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]
    );
    passwordArray.splice(
      Math.floor(Math.random() * 14),
      1,
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]
    );
    passwordArray.splice(
      Math.floor(Math.random() * 14),
      1,
      numericChars[Math.floor(Math.random() * numericChars.length)]
    );
    passwordArray.splice(
      Math.floor(Math.random() * 14),
      1,
      symbolChars[Math.floor(Math.random() * symbolChars.length)]
    );
    password = passwordArray.join("");

    // Display the password in the input field
    document.getElementById("password-input").value = password;
  }

  function selectAndCopy() {
    // Get the input field
    var passwordInput = document.getElementById("password-input");

    // Select the text inside the input field
    passwordInput.select();

    // Copy the selected text to the clipboard
    navigator.clipboard.writeText(passwordInput.value);

    // Provide feedback to the user
    alert("Password copied to clipboard!");
  }

  document
    .getElementById("generate")
    .addEventListener("click", generatePassword);
  document.getElementById("copy").addEventListener("click", selectAndCopy);
});
