import { React, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import {
  IconButton, 
} from "@mui/material";

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 900;
  overflow: auto;
  outline: 0;
`

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.05);
  z-index: 850;
`

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`

const CloseButton = styled.button`
  position: fixed;
  top: 5px;
  right: 9px;
  background-color: #fff;
  width: 16px;
  height: 16px;
  border: none;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`

function Modal({ 
    className,
    onClose,
    maskClosable, // 배경 영역 클릭을 통한 닫기
    closable, // 버튼 클릭을 통한 닫기
    visible,
    children,
}) {
    const dimmed = useRef()

    const onMaskClick = (e) => {
        if (e.target === dimmed.current) {
          onClose()
        }
    }

    const close = (e) => {
        if (onClose) {
          onClose()
        }
    }

    useEffect(() => {
        // modal 오픈시 후방 영역 스크롤 방지

        document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
        // style을 여러번 접근하면 그 횟수만큼 reflow가 발생
        // cssText를 이용하면 1번만 계산하기 때문에 이렇게 js로 css를 건드릴 경우 
        // 퍼포먼스를 위해 필수로 해주시는게 좋습니다. (class 명을 추가해줘도 됩니다.)

        return () => {
            const scrollY = document.body.style.top
            document.body.style.cssText = `position: ""; top: "";`
            window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }
    }, [])
    
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper 
        className={className}
        ref={dimmed}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          { closable && 
            <IconButton sx={{ position: 'fixed;', top: '5px;', right: '4px;' }} onClick={close} disableRipple={true}>
              <CloseIcon />
            </IconButton> }
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  )
}

Modal.defaultProps = {
  closable: true,
  maskClosable: true,
  visible: false
}

Modal.propTypes = {
  visible: PropTypes.bool,
}

export default Modal