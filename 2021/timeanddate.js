function updateClock() {
    var now = new Date(),
        months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
        time = now.getHours() + ':' + ("0" + now.getMinutes()).slice(-2),

        date = [months[now.getMonth()],
                now.getDate(), 
                now.getFullYear()].join(' ');

        sec = now.getSeconds();

    document.getElementById('time').innerHTML = [time, date].join(', ');
    
    setTimeout(updateClock, 1000);
}
updateClock();

function lert() {
    alert("Lucy");
  }