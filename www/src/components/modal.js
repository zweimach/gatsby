/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { navigate, PageRenderer } from "gatsby"
import { useColorMode } from "theme-ui"
import { Global } from "@emotion/core"
import mousetrap from "mousetrap"
import MdClose from "react-icons/lib/md/close"
import {
  colors,
  space,
  zIndices,
  mediaQueries,
} from "../gatsby-plugin-theme-ui"
import "../assets/fonts/futura"
import LazyModal from "./lazy-modal"
import { globalStyles } from "../utils/styles/global"

export default function Modal({
  modalBackgroundPath,
  children,
  modalPrevious,
  modalPreviousLink,
  modalNext,
  modalNextLink,
}) {
  const colorMode = useColorMode()
  const isDark = colorMode[0] === `dark`
  React.useEffect(() => {
    document.querySelector(`html`).style.overflowY = `hidden`

    return () => {
      document.querySelector(`html`).style.overflowY = `auto`
    }
  }, [])

  React.useEffect(() => {
    mousetrap.bind(`left`, modalPrevious)
    mousetrap.bind(`right`, modalNext)
    mousetrap.bind(`spacebar`, modalNext)

    return () => {
      mousetrap.unbind(`left`)
      mousetrap.unbind(`right`)
      mousetrap.unbind(`spacebar`)
    }
  }, [modalPrevious, modalNext])
  return (
    <>
      <Global styles={globalStyles} />
      <PageRenderer location={{ pathname: modalBackgroundPath }} />
      <LazyModal
        isOpen={true}
        style={{
          content: {
            background: `none`,
            border: `none`,
            bottom: `inherit`,
            left: `inherit`,
            margin: `0 auto`,
            overflow: `visible`,
            padding: `${space[8]} 0`,
            right: `inherit`,
            top: `inherit`,
            maxWidth: `1050px`,
          },
          overlay: {
            backgroundColor: isDark
              ? colors.modes.dark.modal.overlayBackground
              : colors.modal.overlayBackground,
            bottom: `unset`,
            left: 0,
            minHeight: `100%`,
            minWidth: `100%`,
            overflowY: `auto`,
            position: `absolute`,
            right: 0,
            top: 0,
            zIndex: zIndices.modal,
          },
        }}
        onRequestClose={() => navigate(modalBackgroundPath)}
        contentLabel="Site Details Modal"
      >
        <div
          sx={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            [mediaQueries.md]: {
              flexWrap: `nowrap`,
            },
          }}
        >
          <div
            sx={{
              bg: `card.background`,
              borderRadius: 2,
              boxShadow: `dialog`,
              position: `relative`,
              alignItems: `center`,
              order: 1,
              width: `100%`,
            }}
          >
            <button
              onClick={() => navigate(modalBackgroundPath)}
              sx={{
                bg: `card.background`,
                border: 0,
                borderRadius: 6,
                color: `textMuted`,
                cursor: `pointer`,
                fontSize: 4,
                height: 40,
                left: `auto`,
                position: `absolute`,
                right: t => t.space[7],
                top: t => t.space[8],
                width: 40,
                "&:hover": {
                  bg: `ui.hover`,
                  color: `gatsby`,
                },
              }}
            >
              <MdClose />
            </button>
            {children}
          </div>
          {modalPreviousLink}
          {modalNextLink}
        </div>
      </LazyModal>
    </>
  )
}