init();

var num = 1;

function common() { }

function init() {
  a()
  b()
}

function a(flag) {
  if (flag) {
    b()
  } else {
    c()
  }
  common()
}

function b() {
  console.log('b');
  common()
}

function c() {
  console.log('c')
  common()
}

// init() => a() => b()