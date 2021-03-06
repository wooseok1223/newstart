import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import IconButton from "@material-ui/core/IconButton"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import { fromJS, List, Map } from "immutable"
import React, { useEffect, KeyboardEvent } from "react"
import { imageArr } from "./imageArr"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      "&:hover, &$focusVisible": {
        opacity: 1,
      },
      opacity: 0.55,
    },
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      marginTop: "40px",
      backgroundColor: "gray",
      width: "100%",
    },
    gridList: {
      width: "40%",
      height: "100%",
      "&:hover": {},
    },
    titleBar: {
      background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " + "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    icon: {
      color: "white",
    },
  })
)

let tileData = [
  {
    img: "",
    title: "Image1",
    author: "author",
    featured: false,
  },
  {
    img: "",
    title: "Image2",
    author: "author",
    featured: false,
  },
]

export function VsTournament() {
  const classes = useStyles()

  let items = React.useRef<HTMLLIElement | null[]>([])

  let [tileState, setTileState] = React.useState(fromJS([]))
  useEffect(() => {
    tileState = spliceImage()

    setTileState(tileState)
  }, [])

  const spliceImage = () => {
    for (let i = 0; i < 2; i++) {
      let randomInt = Math.floor(Math.random() * (imageArr.length - 0 + 1)) + 0
      let spliceData = imageArr.splice(randomInt - 1, 1)[0]
      tileState = tileState.set(i, tileData[i])
      tileState = tileState.setIn([i, "img"], spliceData)
    }
    return tileState
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={700} spacing={10} className={classes.gridList}>
        {tileState.toJS().map((tile, i) => (
          <GridListTile
            key={tile.img}
            cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1}
            id={"gridList" + i}
            ref={(el) => {
              items.current[i] = el
            }}
          >
            {i}
            <img
              src={tile.img}
              style={{ height: "100%", width: "100%" }}
              alt={tile.title}
              onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
                const alt = (e.target as HTMLImageElement).alt
                let pos = 0

                if (alt === "Image1") {
                  items.current[1].style.visibility = "hidden"
                  items.current[0].style.position = "relative"
                  const frame = () => {
                    if (pos === 150) {
                      clearInterval(id)
                      setTimeout(() => {
                        setTileState(spliceImage())
                      }, 2000)
                    } else {
                      pos++
                      items.current[0].style.left = pos + "px"
                    }
                  }
                  const id = setInterval(frame, 5)
                } else {
                  items.current[0].style.visibility = "hidden"
                  items.current[1].style.position = "relative"
                  const frame = () => {
                    if (pos === 150) {
                      clearInterval(id)
                      setTimeout(() => {
                        setTileState(spliceImage())
                      }, 2000)
                    } else {
                      pos++
                      items.current[1].style.left = -pos + "px"
                    }
                  }
                  const id = setInterval(frame, 5)
                }
              }}
              className={classes.image}
            />
            <GridListTileBar
              title={tile.title}
              titlePosition="top"
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`} className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
