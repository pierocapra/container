$(document).ready(function () {
  $("#btnElevCoords").click(function () {
    $.ajax({
      url: "php/getElevation.php",
      type: "POST",
      dataType: "json",
      data: { late: $("#latElev").val(), lnge: $("#lngElev").val() },
      success: function (t) {
        console.log(JSON.stringify(t)),
          "ok" == t.status.name &&
            (-32768 == t.data
              ? $("#srtm3").html(
                  "The coordinates you have submitted are located in the ocean"
                )
              : $("#srtm3").html(t.data + " meters"));
      },
      error: function (t, a, e) {
        alert(
          "Error! The coordinates you have inserted are not valid or out of range."
        );
      },
    });
  }),
    $("#btnPlaceCoord").click(function () {
      $.ajax({
        url: "php/getPlace.php",
        type: "POST",
        dataType: "json",
        data: { latp: $("#latPlace").val(), lngp: $("#lngPlace").val() },
        success: function (t) {
          console.log(JSON.stringify(t)),
            "ok" == t.status.name
              ? ($("#countryName").html(t.data[0].countryName),
                $("#toponymName").html(t.data[0].toponymName),
                $("#distance").html(t.data[0].distance))
              : console.log("not working");
        },
        error: function (t, a, e) {
          alert(
            "Error! The coordinates you have inserted are not valid or out of range."
          );
        },
      });
    }),
    $("#btnEQcoord").click(function () {
      $.ajax({
        url: "php/getEarthquakes.php",
        type: "POST",
        dataType: "json",
        data: {
          north: $("#north").val(),
          south: $("#south").val(),
          east: $("#east").val(),
          west: $("#west").val(),
        },
        success: function (t) {
          console.log(JSON.stringify(t)),
            "ok" == t.status.name &&
              ($("#EQdatetime").html(t.data[0].datetime),
              $("#magnitude").html(t.data[0].magnitude));
        },
        error: function (t, a, e) {
          alert(
            "Error! The coordinates you have inserted are not valid or out of range."
          );
        },
      });
    }),
    $("#btnResetElev").click(function () {
      $("#latElev").val(""), $("#lngElev").val(""), $("#srtm3").html("");
    }),
    $("#btnResetPlace").click(function () {
      $("#latPlace").val(""),
        $("#lngPlace").val(""),
        $("#countryName").html(""),
        $("#toponymName").html(""),
        $("#distance").html("");
    }),
    $("#btnResetEQcoord").click(function () {
      $("#north").val(""),
        $("#south").val(""),
        $("#east").val(""),
        $("#west").val(""),
        $("#EQdatetime").html(""),
        $("#magnitude").html("");
    });
}),
  $(window).on("load", function () {
    $("#preloader").length &&
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
  });
