(() => {
  const events = {
    a: () => {
      const command = keys[1];
      if (command) {
        goToAnswer(command);
      }
    },
    q: () => {
      scrollToElement(question);
    }
  }
  const keys = [];

  const header = document.querySelector('.top-bar');
  if (!header) {
    return;
  }
  const headerHeight = header.getBoundingClientRect().height;
  const question = document.querySelector('#question');
  const answers = document.querySelectorAll('.answer');

  const goToAnswer = (index: number) => {
    const answer = answers[index];
    if (answer) {
      scrollToElement(answer);
    }
  }

  const scrollToElement = (element: Element) => {
    const top = element.getBoundingClientRect().top + document.documentElement.scrollTop - headerHeight;
    scrollTo(0, top);
  }

  const fire = () => {
    events[keys[0]]();
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