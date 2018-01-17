(() => {
  const keys = [];

  const headerHeight = document.querySelector('.top-bar').getBoundingClientRect().height;
  const question = document.querySelector('#question');
  const answers = document.querySelectorAll('.answer');

  const goToAnswer = (index: number) => {
    const answer = answers[index];
    const top = answer.getBoundingClientRect().top + document.documentElement.scrollTop - headerHeight;
    scrollTo(0, top);
  }

  const fire = () => {
    if (keys[0] === 'a') {
      const command = keys[1];
      if (command) {
        goToAnswer(command);
      }
    }
  }

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    const key = String.fromCharCode(event.keyCode).toLowerCase();
    if (!keys.includes(key)) {
      keys.push(key);
      fire();
    }
  });

  document.addEventListener('keyup', (event: KeyboardEvent) => {
    keys.splice(keys.indexOf(String.fromCharCode(event.keyCode).toLowerCase()), 1);
  });
})();