// Json array for places
var markers = {
    'group-1': [
            {
            "title": 'Poznań',
            "lat": '18.641400',
            "lng": '72.872200',
            "description": 'Miasto Poznań'
        },
        {
            "title": 'Centrum',
            "lat": '19.879700',
            "lng": '75.335300',
            "description": 'Centrum'
        },
        {
            "title": 'Zachód',
            "lat": '19.218400',
            "lng": '73.086700',
            "description": 'Zachód'
        },
        {
            "title": 'Wschód',
            "lat": '18.750000',
            "lng": '73.416700',
            "description": 'Lonavla'
        },
        {
            "title": 'Północ',
            "lat": '20.550500',
            "lng": '74.530900',
            "description": 'Malegaon'
        }
    ],
  'group-3': [
            {
            "title": 'Poznań',
            "lat": '18.641400',
            "lng": '72.872200',
            "description": 'Miasto Poznań'
        },
        {
            "title": 'Centrum',
            "lat": '19.879700',
            "lng": '75.335300',
            "description": 'Centrum'
        },
        {
            "title": 'Zachód',
            "lat": '19.218400',
            "lng": '73.086700',
            "description": 'Zachód'
        },
        {
            "title": 'Wschód',
            "lat": '18.750000',
            "lng": '73.416700',
            "description": 'Lonavla'
        },
        {
            "title": 'Północ',
            "lat": '20.550500',
            "lng": '74.530900',
            "description": 'Malegaon'
        }
    ],  'group-4': [
            {
            "title": 'Poznań',
            "lat": '18.641400',
            "lng": '72.872200',
            "description": 'Miasto Poznań'
        },
        {
            "title": 'Centrum',
            "lat": '19.879700',
            "lng": '75.335300',
            "description": 'Centrum'
        },
        {
            "title": 'Zachód',
            "lat": '19.218400',
            "lng": '73.086700',
            "description": 'Zachód'
        },
        {
            "title": 'Wschód',
            "lat": '18.750000',
            "lng": '73.416700',
            "description": 'Lonavla'
        },
        {
            "title": 'Północ',
            "lat": '20.550500',
            "lng": '74.530900',
            "description": 'Malegaon'
        }
    ],
    'group-3': [
        {
            "title": 'Mumbai',
            "lat": '18.964700',
            "lng": '72.825800',
            "description": 'Mumbai formerly Bombay, is the capital city of the Indian state of Maharashtra.'
      },
        {
            "title": 'Nashik',
            "lat": '20.001400',
            "lng": '73.786900',
            "description": 'Nashik'
        },
        {
            "title": 'Pune',
            "lat": '18.523600',
            "lng": '73.847800',
            "description": 'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.'
        },
        {
            "title": 'Shahpur',
            "lat": '19.450000',
            "lng": '73.330000',
            "description": 'Shahpur'
        },
        {
            "title": 'Shirdi',
            "lat": '19.770000',
            "lng": '74.480000',
            "description": 'Shirdi'
        },
        {
            "title": 'Thane',
            "lat": '19.182800',
            "lng": '72.961200',
            "description": 'Thane'
        },
        {
            "title": 'Vashi',
            "lat": '18.750000',
            "lng": '73.033300',
            "description": 'Vashi'
        }
    ]
};

(function($) {
    "use strict";

    var infoWindow, bounds, map, markerIcon, markerActiveIcon, mapMarkers = [];

    function initializeMap() {
        var mapOptions = {
            scrollwheel: false,
        };
        markerIcon = {
            url: 'https://github.com/a7mg/Map-with-markers/blob/master/marker.png?raw=true',
            size: new google.maps.Size(50, 50),
            scaledSize: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0,0)
        }
        markerActiveIcon = {
            url: 'https://github.com/a7mg/Map-with-markers/blob/master/marker-active.png?raw=true',
            size: new google.maps.Size(50, 50),
            scaledSize: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0,0)
        }
        infoWindow = new google.maps.InfoWindow();
        bounds = new google.maps.LatLngBounds();
        map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

        dropMarkers('group-1');
    }

    function dropMarkers(target) {
        for (var i in markers[target]) {
            var data = markers[target][i];

            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: markerIcon,
                title: data.title,
                animation: google.maps.Animation.DROP
            });

            mapMarkers.push(marker);

            bounds.extend(marker.getPosition());

            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    for (var j = 0; j < mapMarkers.length; j++) {
                      mapMarkers[j].setIcon(markerIcon);
                    }
                    this.setIcon(markerActiveIcon)

                    infoWindow.setContent('<div style="width: 300px; text-align: center;"><h3>'+data.title+'</h3>'+'<p>'+data.description+'</p></div>');
                    infoWindow.open(map, marker);
                });
            })(marker, data);
        }
        map.fitBounds(bounds);
    }
    function DeleteMarkers() {
        for (var i = 0; i < mapMarkers.length; i++) {
            mapMarkers[i].setMap(null);
        }
        mapMarkers = [];
    };

    $(document).on('click', 'button', function(e) {
        e.preventDefault();
        DeleteMarkers();
        dropMarkers($(this).data('target'));
    })
    $(document).on('click', 'a', function(e) {
        e.preventDefault();
        google.maps.event.trigger(mapMarkers[$(this).parent().index()], 'click');
    })
    google.maps.event.addDomListener(window, 'load', initializeMap);
})(jQuery);


function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i,p, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');


  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}