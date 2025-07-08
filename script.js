document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.expand-button')

  // Function to toggle accordion item (keeping original functionality)
  function toggleAccordion(button) {
    button.classList.toggle('open')
    button.parentElement.parentElement.classList.toggle('open')

    // Update aria-expanded for accessibility
    const isExpanded = button.classList.contains('open')
    button.setAttribute('aria-expanded', isExpanded)
  }

  // Function to focus next/previous button
  function focusButton(currentIndex, direction) {
    let nextIndex
    if (direction === 'next') {
      nextIndex = currentIndex + 1 >= buttons.length ? 0 : currentIndex + 1
    } else {
      nextIndex = currentIndex - 1 < 0 ? buttons.length - 1 : currentIndex - 1
    }
    buttons[nextIndex].focus()
  }

  // Add event listeners to each button
  buttons.forEach((button, index) => {
    // Original click event
    button.addEventListener('click', function () {
      toggleAccordion(button)
    })

    // Keyboard navigation
    button.addEventListener('keydown', function (e) {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault()
          toggleAccordion(button)
          break
        case 'ArrowDown':
          e.preventDefault()
          focusButton(index, 'next')
          break
        case 'ArrowUp':
          e.preventDefault()
          focusButton(index, 'previous')
          break
        case 'Home':
          e.preventDefault()
          buttons[0].focus()
          break
        case 'End':
          e.preventDefault()
          buttons[buttons.length - 1].focus()
          break
      }
    })
  })
})
