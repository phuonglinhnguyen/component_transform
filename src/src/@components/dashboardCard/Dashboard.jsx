import * as React from 'react'
import DashboardItem from './DashboardItem'
import { DecorateAutoSizer } from '../common'
import { stopEvent } from '../utils/event'
import EventListener from 'react-event-listener';
const style = {
  root: {
    width: 'calc(100% - 16px)',
    position: 'relative',
    paddingTop: 16,
    paddingLeft: 16,
    // overflowX: 'hidden',
    // overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
  }
  ,
   content: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    width: 'inherit',
    textAlign: 'center',
    margin: '0px auto',
  }
}
type Props={
  datas:Array<Object>,
  width:Number,
  height:Number,
  onClickItem:Function
}
 class GridCard extends React.PureComponent<Props> {
  static defaultProps ={
    datas:[],
    onClickItem:()=>undefined
  }
  state = {
    selecting: -1,
    redirecting: -1,
    cols: 1,
    width_content: 336,
  }

  componentDidMount = () => {
    const { width } = this.props;
    let cols = Math.floor(width / 290);
    let width_content = cols * 286;
    this.setState({
      cols, width_content
    })
  }
  handleMouseOut=(event)=>{
    this.setState({selecting: -1 });
  }
  handlekeyDown = (event) => {
    const { datas ,onClickItem } = this.props;
    const { cols, selecting } = this.state;
    let key = event.key.toLowerCase();
    if(selecting===-1){
      if(['arrowright','arrowdown'].includes(key)){
          this.setState({selecting:0})       
      }else if(['arrowleft','arrowup'].includes(key)){
        this.setState({selecting:datas.length-1})       
      }
    }
    switch (key) {
      case 'arrowleft':
        if (selecting === 0) {
          this.setState({ selecting: datas.length - 1 })
        } else {
          this.setState({ selecting: selecting - 1 })
        }
        stopEvent(event)
        break;
      case 'arrowright':
        if (selecting === datas.length - 1) {
          this.setState({ selecting: 0 })
        } else {
          this.setState({ selecting: selecting + 1 })
        }
        stopEvent(event)

        break;
      case 'arrowup':
        if (selecting - cols >= 0) {
          this.setState({ selecting: selecting - cols })
        } else {
          this.setState({ selecting:  datas.length- 1 })
        }
        stopEvent(event)

        break;
      case 'arrowdown':
        if (selecting + cols >= datas.length) {
          let index =  selecting%cols;
          this.setState({ selecting:index  })
        } else {
          this.setState({ selecting: selecting + cols })
        }
        stopEvent(event);
        break;

      case 'enter':
        if(selecting>=0){
          onClickItem(datas[selecting])
        }   
        break;
      default:
        break;
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { width } = nextProps;
    let cols = Math.floor(width / 320);
    let width_content = cols * 306;
    this.setState({
      cols, width_content
    })
  }
  handleHoverChild=(event,index)=>{
    this.setState({selecting:index})
  }
  handleOnClickItem = (data) => {
    const {onClickItem} =this.props; 
    onClickItem(data)
  }
  render() {
    const { datas } = this.props;
    const { selecting, redirecting, width_content } = this.state;
    return (
      <div style={style.root}>
       <EventListener target="window" onKeyDown={this.handleKeyDown} />
        <div onMouseOut={this.handleMouseOut} style={{ ...style.content  }}>
          {datas.map((item, key) => {
            return <DashboardItem index={key}
            onHover={this.handleHoverChild}
            selecting={key === selecting} redirecting={redirecting === key} onClick={this.handleOnClickItem} item={item} key={key} />
          })}
        </div>
      </div>
    )
  }
}
export default DecorateAutoSizer()(GridCard)