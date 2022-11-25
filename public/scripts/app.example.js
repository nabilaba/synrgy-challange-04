// Class App
class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
  }

  // Async Await Button
  async init() {
    await this.load();
    this.loadButton.onclick = this.run;
  }

  // Function Filter car
  run = () => {
    this.clear();
    const data = this.filterCar();

    // Jika data yang di cari tidak ditemukan
    if (data.length == 0 || data == undefined) {
      const node = document.createElement("div");
      node.innerHTML = `<div class="alert alert-danger mt-2" role="alert">Data Tidak Ditemukan</div>`;
      this.carContainerElement.appendChild(node);
    } else {
      // jika di temukan
      data.forEach((car) => {
        const node = document.createElement("div");
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
    }
  };

  filterCar() {
    const driver = document.getElementById("driver").value;
    const date = document.getElementById("date").value;
    const formatDate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const time = document.getElementById("time").value;
    const formatTime = {
      hour: "numeric",
      minute: "numeric",
    };
    const passanger = document.getElementById("passanger").value;

    if (
      driver == "dengan-sopir" &&
      date != "" &&
      time != "" &&
      passanger != ""
    ) {
      return Car.list.filter(
        (car) =>
          car.available == true &&
          new Date(car.availableAt).toLocaleDateString("id-ID", formatDate) ==
            new Date(date).toLocaleDateString("id-ID", formatDate) &&
          new Date(car.availableAt).toLocaleTimeString("id-ID", formatTime) ==
            time.split(":").join(".") &&
          car.capacity == passanger
      );
    }

    if (
      driver == "tanpa-sopir" &&
      date != "" &&
      time != "" &&
      passanger != ""
    ) {
      return Car.list.filter(
        (car) =>
          car.available == false &&
          new Date(car.availableAt).toLocaleDateString("id-ID", formatDate) ==
            new Date(date).toLocaleDateString("id-ID", formatDate) &&
          new Date(car.availableAt).toLocaleTimeString("id-ID", formatTime) ==
            time.split(":").join(".") &&
          car.capacity == passanger
      );
    }

    if (driver == "dengan-sopir" && date != "" && time != "") {
      return Car.list.filter(
        (car) =>
          car.available == true &&
          new Date(car.availableAt).toLocaleDateString("id-ID", formatDate) ==
            new Date(date).toLocaleDateString("id-ID", formatDate) &&
          new Date(car.availableAt).toLocaleTimeString("id-ID", formatTime) ==
            time.split(":").join(".")
      );
    }

    if (driver == "tanpa-sopir" && date != "" && time != "") {
      return Car.list.filter(
        (car) =>
          car.available == false &&
          new Date(car.availableAt).toLocaleDateString("id-ID", formatDate) ==
            new Date(date).toLocaleDateString("id-ID", formatDate) &&
          new Date(car.availableAt).toLocaleTimeString("id-ID", formatTime) ==
            time.split(":").join(".")
      );
    }

    if (driver == "dengan-sopir" && date != "") {
      return Car.list.filter(
        (car) =>
          car.available == true &&
          new Date(car.availableAt).toLocaleDateString("id-ID", formatDate) ==
            new Date(date).toLocaleDateString("id-ID", formatDate)
      );
    }

    if (driver == "tanpa-sopir" && date != "") {
      return Car.list.filter(
        (car) =>
          car.available == false &&
          new Date(car.availableAt).toLocaleDateString("id-ID", formatDate) ==
            new Date(date).toLocaleDateString("id-ID", formatDate)
      );
    }

    if (driver == "dengan-sopir") {
      return Car.list.filter((car) => car.available == true);
    }

    if (driver == "tanpa-sopir") {
      return Car.list.filter((car) => car.available == false);
    }

    if (date != "" && time != "" && passanger != "") {
      return Car.list.filter(
        (car) =>
          new Date(car.availableAt).toLocaleDateString("id-ID", formatDate) ==
            new Date(date).toLocaleDateString("id-ID", formatDate) &&
          new Date(car.availableAt).toLocaleTimeString("id-ID", formatTime) ==
            time.split(":").join(".") &&
          car.capacity == passanger
      );
    }

    if (time != "" && passanger != "") {
      return Car.list.filter(
        (car) =>
          new Date(car.availableAt).toLocaleTimeString("id-ID", formatTime) ==
            time.split(":").join(".") && car.capacity == passanger
      );
    }

    if (passanger != "") {
      return Car.list.filter((car) => car.capacity == passanger);
    }

    return Car.list.filter((car) => car);
  }

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

function getDateTimeNow() {
  var today = new Date();
  var date =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");
  var time =
    String(today.getHours()).padStart(2, "0") +
    ":" +
    String(today.getMinutes()).padStart(2, "0") +
    ":" +
    String(today.getSeconds()).padStart(2, "0");
  var dateNow = date + "T" + time + ".000Z";
  return dateNow;
}
