import React from 'react'
import Paper from 'material-ui/Paper';
import { Translate } from 'react-redux-i18n'
const style = {
    box: {
        borderRadius: '6px 6px 0px 0px ',
        display: 'block',
        minHeight: '45px',
        width: '100%',
        marginBottom: 15,
        height: 50,
        background: 'rgba(255,0,0,1)',

    },
    icon: {
        borderTopLeftRadius: '6px',
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        display: 'block',
        float: 'left',
        height: '50px',
        width: '50px',
        textAlign: 'center',
        fontSize: '45px',
        lineHeight: '50px',
        background: 'rgba(63, 81, 181, 0)'
    },
    box_content: {
        borderTopRightRadius: 6,
        textAlign: 'left',
        padding: '16px 10px',
        //marginLeft: '0',
    },
    box_text: {
        //color: 'red',
        textAlign: 'center',
        // textTransform: 'uppercase',
        display: 'block',
        fontSize: '30px',
        //whiteSpace: 'nowrap',
        //overflow: 'hidden',
        //textOverflow: 'ellipsis'
    }
}

export default (props) => {
    const {
        index,
        item,
        onClick,
        muiTheme,
        selecting,
        redirecting,
        onHover,
    } = props //eslint-disable-line
    return (
        <Paper
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                onClick(item)
            }}
            onMouseOver={event => onHover(event, index)}
            style={{
                width: `25%`,
                height: '150px',
                // margin: `${50}px ${50}px ${50}px ${50}px`,
                marginLeft: "4%",
                marginRight: "3%",
                marginTop: "50px",
                background: selecting ? '#FFFFFF' : '#f5f5f5',
                borderRadius: 10,
                cursor: 'pointer',
                position: 'relative'
            }}
            rounded={true}
            zDepth={selecting ? 5 : 1}
        >
            <div style={{ ...style.box, background: selecting ? muiTheme.palette.primary1Color : muiTheme.palette.primary2Color }}>
                <div style={style.icon}>
                    <item.icon color='white' />
                </div>
            </div>
            <div style={style.box_content}>
                <span style={style.box_text}>
                    {item.name.toUpperCase()} 
                </span>
            </div>

            {/* <div style={{ textAlign: 'left', padding: '5px 10px' }}>
                More Information
                </div> */}
        </Paper>
    )
}
