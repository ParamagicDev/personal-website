import '../styles/index.css'
import Swup from 'swup'
import SwupSlideTheme from '@swup/slide-theme'
import SwupBodyClassPlugin from '@swup/body-class-plugin'
import SwupScrollPlugin from '@swup/scroll-plugin'
import { Application } from 'stimulus'
import { definitionsFromContext } from 'stimulus/webpack-helpers'
import Prism from 'prismjs'

import 'bridgetown-quick-search'

const application = Application.start()
const context = require.context('./controllers', true, /\.js$/)
application.load(definitionsFromContext(context))

const addHighlighting = () => {
  if (document.querySelectorAll('.markdown').length !== 0) {
    Prism.highlightAll()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let mainEl = '#swup'
  let containers = [mainEl, '#topnav']
  const swup = new Swup({
    containers: containers,
    plugins: [
      new SwupSlideTheme({ mainElement: mainEl }),
      new SwupBodyClassPlugin(),
      new SwupScrollPlugin({ animateScroll: false })
    ]
  })

  swup.on('contentReplaced', function () {
    addHighlighting()
  })

  addHighlighting()
})
