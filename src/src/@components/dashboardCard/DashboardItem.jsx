import React from 'react'
import { Paper, withStyles } from '@material-ui/core'
import { Translate } from 'react-redux-i18n'
import { compose } from 'recompose';
import classnames from 'classnames'
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => {
    return ({
        box: {
            borderRadius: '2px 2px 0px 0px ',
            display: 'block',
            minHeight: '45px',
            width: '100%',
            marginBottom: 15,
            height: 50,
            background: theme.palette.primary[theme.palette.type]

        },
        box_selecting: {
            borderRadius: '2px 2px 0px 0px ',
            display: 'block',
            minHeight: '45px',
            width: '100%',
            marginBottom: 15,
            height: 50,
            background: fade(theme.palette.primary[theme.palette.type], 1)
        },
        icon: {
            borderTopLeftRadius: '2px',
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
            borderTopRightRadius: 2,
            textAlign: 'left',
            padding: '16px 10px',
            marginLeft: '50px',
        },
        box_content_none_icon: {
            borderTopRightRadius: 2,
            textAlign: 'left',
            padding: '16px 10px',
            marginLeft: '0px',
        },
        box_text: {
            color: 'white',
            textTransform: 'uppercase',
            display: 'block',
            fontSize: '18px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        task: {
            color: fade(theme.palette.secondary.contrastText, .95),
            backgroundColor:fade(theme.palette.secondary[theme.palette.type], .95),
            backgroundColtop: '11px',
            width: '52px',
            height: '28px',
            right: '12px',
            top: '12px',
            display: 'flex',
            zIndex: 1,
            position: 'absolute',
            flexWrap: 'wrap',
            fontSize: '1.25rem',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            alignItems: 'center',
            borderRadius: '14px',
            alignContent: 'center',
            flexDirection: 'row',
            justifyContent: 'center'

        }
    })
}

const DashBoardItem = (props) => {
    const { index, onClick, item, selecting, redirecting, onHover, classes } = props //eslint-disable-line
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
                width: `calc(50% - 16px)`,
                height: 50,
                margin: `${0}px ${16}px ${16}px ${0}px`,
                background: selecting ? '#FFFFFF' : '#f5f5f5',
                borderRadius: 2,
                cursor: 'pointer',
                position: 'relative'
            }}
            square={true}
            elevation={selecting ? 5 : 1}
        >
            <div className={classnames(selecting ? classes.box : classes.box_selecting)}>
                {item.icon && (<div className={classnames(classes.icon)} >
                    <item.icon color='white' />
                </div>)}
                <div className={classnames(item.icon ? classes.box_content : classes.box_content_none_icon)}>
                    <span className={classnames(classes.box_text)}>
                        <Translate value={item.title} />
                    </span>
                </div>
                {item.instances&&<span className={classnames(classes.task)}>{item.instances}</span>}
            </div>

        </Paper>
    )
}
export default compose(
    withStyles(styles)
)(DashBoardItem);
