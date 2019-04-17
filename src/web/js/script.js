function reveal() {
  fetch('http://localhost:8080/rdu/jfk/2019-06-10')
  .then((resp) => resp.json())
  .then((data) => {
    document.getElementById("hiddenMsg").style.display = 'block';
    document.getElementById("hiddenMsg").innerHTML = JSON.stringify(data[0].Link);
  })
  .catch((err) => {
  })
}
