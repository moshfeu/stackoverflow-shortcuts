(() => {
  const events = {
    a: () => {
      const command = keys[1];
      if (command) {
        goToAnswer(command);
      }
    },
    q: () => {
      goTo(question);
    },
    u: () => {
      upvote();
    },
    d: () => {
      downvote();
    },
    27: () => {
      unHighlight();
    }
  }
  const keys = [];

  const header = document.querySelector('.top-bar');
  if (!header) {
    return;
  }
  const headerHeight = header.getBoundingClientRect().height;
  const question = document.querySelector('#question') as HTMLDivElement;
  const answers = document.querySelectorAll('.answer') as NodeListOf<HTMLDivElement>;
  const overlay = document.createElement('div');
  let current: HTMLDivElement;
  overlay.classList.add('sosc-overlay');
  document.body.appendChild(overlay);

  const goToAnswer = (index: number) => {
    const answer = answers[index];
    if (answer) {
      goTo(answer);
    }
  }

  const goTo = (elm) => {
    highlightElement(elm);
    scrollToElement(elm);
  }

  const highlightElement = (element: HTMLDivElement) => {
    const currentHighlight = document.querySelector('.sosc-highlight');
    currentHighlight && currentHighlight.classList.remove('sosc-highlight');
    overlay.classList.add('open');
    element.classList.add('sosc-highlight');
    current = element;
  }

  const unHighlight = () => {
    overlay.classList.remove('open');
  }

  const upvote = () => {
    current && (<HTMLLinkElement>current.querySelector('.vote-up-off')).click()
  }

  const downvote = () => {
    current && (<HTMLLinkElement>current.querySelector('.vote-down-off')).click()
  }

  const scrollToElement = (element: Element) => {
    const top = element.getBoundingClientRect().top + document.documentElement.scrollTop - headerHeight;
    scrollTo(0, top);
  }

  const fire = () => {
    if (events[keys[0]]) {
      events[keys[0]]();
    }
  }

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    let key = events[event.keyCode] ? event.keyCode : String.fromCharCode(event.keyCode).toLowerCase();
    if (!keys.includes(key)) {
      keys.push(key);
      fire();
    }
  });

  document.addEventListener('keyup', (event: KeyboardEvent) => {
    keys.splice(keys.indexOf(String.fromCharCode(event.keyCode).toLowerCase()), 1);
  });
})();