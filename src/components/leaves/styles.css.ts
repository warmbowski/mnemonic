import { globalStyle, globalKeyframes } from "@vanilla-extract/css"

// https://1stwebdesigner.com/14-css-animations-for-fall/

globalStyle("#leaves", {
  position: "absolute",
  top: "-50px",
  width: "100%",
  textAlign: "center",
  display: "flex",
  justifyContent: "space-around",
})

globalStyle("#leaves i", {
  display: "inline-block",
  width: "200px",
  height: "150px",
  background: `linear-gradient(to bottom right, #309900, #005600)`,
  transform: "skew(20deg)",
  borderRadius: "5% 40% 70%",
  boxShadow: "inset 0px 0px 1px #222",
  border: "1px solid #333",
  zIndex: 200,
  animation: "falling 5s 0s infinite",
})

globalStyle("#leaves i:nth-of-type(2n)", {
  animation: "falling2 5s 0s infinite",
})

globalStyle("#leaves i:nth-of-type(3n)", {
  animation: "falling3 5s 0s infinite",
})

globalStyle("#leaves i:before", {
  position: "absolute",
  content: "''",
  top: "117px",
  right: "9px",
  height: "27px",
  width: "32px",
  transform: "rotate(49deg)",
  borderRadius: "0% 15% 15% 0%",
  border: "1px solid #222",
  background: `linear-gradient(to right, rgba(0,100,0,1), #005600)`,
})

globalStyle("#leaves i:after", {
  content: "''",
  height: "125px",
  width: "10px",
  background: `linear-gradient(to right, rgba(0,0,0,.15), rgba(0,0,0,0))`,
  display: "block",
  transform: "rotate(125deg)",
  position: "absolute",
  left: "85px",
  borderRadius: "50%",
})

globalStyle("#leaves i:nth-of-type(n)", {
  height: "23px",
  width: "30px",
})

globalStyle("#leaves i:nth-of-type(n):before", {
  width: "7px",
  height: "5px",
  top: "17px",
  right: "1px",
})

globalStyle("#leaves i:nth-of-type(n):after", {
  width: "2px",
  height: "17px",
  left: "12px",
  top: "0px",
})

globalStyle("#leaves i:nth-of-type(2n+1)", {
  height: "11px",
  width: "16px",
})

globalStyle("#leaves i:nth-of-type(2n+1):before", {
  width: "4px",
  height: "3px",
  top: "7px",
  right: "0px",
})

globalStyle("#leaves i:nth-of-type(2n+1):after", {
  width: "2px",
  height: "6px",
  left: "5px",
  top: "1px",
})

globalStyle("#leaves i:nth-of-type(3n+2)", {
  height: "17px",
  width: "23px",
})

globalStyle("#leaves i:nth-of-type(3n+2):before", {
  height: "4px",
  width: "4px",
  top: "12px",
  right: "1px",
})

globalStyle("#leaves i:nth-of-type(3n+2):after", {
  height: "10px",
  width: "2px",
  top: "1px",
  left: "8px",
})

globalStyle("#leaves i:nth-of-type(n)", {
  animationDelay: "1.9s",
})

globalStyle("#leaves i:nth-of-type(2n)", {
  animationDelay: "3.9s",
})

globalStyle("#leaves i:nth-of-type(3n)", {
  animationDelay: "2.3s",
})

globalStyle("#leaves i:nth-of-type(4n)", {
  animationDelay: "4.4s",
})

globalStyle("#leaves i:nth-of-type(5n)", {
  animationDelay: "5s",
})

globalStyle("#leaves i:nth-of-type(6n)", {
  animationDelay: "3.5s",
})

globalStyle("#leaves i:nth-of-type(7n)", {
  animationDelay: "2.8s",
})

globalStyle("#leaves i:nth-of-type(8n)", {
  animationDelay: "1.5s",
})

globalStyle("#leaves i:nth-of-type(9n)", {
  animationDelay: "3.3s",
})

globalStyle("#leaves i:nth-of-type(10n)", {
  animationDelay: "2.5s",
})

globalStyle("#leaves i:nth-of-type(11n)", {
  animationDelay: "1.2s",
})

globalStyle("#leaves i:nth-of-type(12n)", {
  animationDelay: "4.1s",
})

globalStyle("#leaves i:nth-of-type(13n)", {
  animationDelay: "1s",
})

globalStyle("#leaves i:nth-of-type(14n)", {
  animationDelay: "4.7s",
})

globalStyle("#leaves i:nth-of-type(15n)", {
  animationDelay: "3s",
})

globalStyle("#leaves i:nth-of-type(n)", {
  background: `linear-gradient(to bottom right, #309900, #005600)`,
})

globalStyle("#leaves i:nth-of-type(2n+2)", {
  background: `linear-gradient(to bottom right, #5e9900, #2b5600)`,
})

globalStyle("#leaves i:nth-of-type(4n+1)", {
  background: `linear-gradient(to bottom right, #990, #564500)`,
})

globalStyle("#leaves i:nth-of-type(n)", {
  opacity: "1",
})

globalStyle("#leaves i:nth-of-type(3n+1)", {
  opacity: "1",
})

globalStyle("#leaves i:nth-of-type(3n+2)", {
  opacity: "1",
})

globalStyle("#leaves i:nth-of-type(n)", {
  transform: "rotate(180deg)",
})

globalStyle("#leaves i:nth-of-type(n)", {
  animationTimingFunction: "ease-in-out",
})

globalKeyframes("falling", {
  "0%": {
    transform: "translate3d(300,0,0) rotate(0deg)",
  },
  "100%": {
    transform: "translate3d(-35px,700px,0) rotate(90deg)",
  },
})

globalKeyframes("falling3", {
  "0%": {
    transform: "translate3d(0,0,0) rotate(-20deg)",
  },
  "50%": {
    transform: "translate3d(+100px,320px,0) rotate(20deg)",
  },
  "100%": {
    transform: "translate3d(-100px,640px,0) rotate(-70deg)",
  },
})

globalKeyframes("falling2", {
  "0%": {
    transform: "translate3d(0,0,0) rotate(90deg)",
  },
  "50%": {
    transform: "translate3d(-20px,0340px,0) rotate(20deg)",
  },
  "100%": {
    transform: "translate3d(-200px,680px,0) rotate(0deg)",
  },
})
