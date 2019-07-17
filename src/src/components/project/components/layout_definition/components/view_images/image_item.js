import React from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import IconClose from 'material-ui/svg-icons/navigation/close';
export const ImageItem = (props) => {
    return (
        <Paper
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                props.onSelect();
            }}
            style={{
                width: `calc(100% - 16px)`,
                position: 'relative',
                display: 'block',
                margin: '0px 0px 8px 8px'
            }}
            zDepth={props.selected ? 3 : 1}
        >
            <div
                style={{
                    width: '100%',
                    height: 'calc(100% - 110px)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {
                    props.selected ?
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                background: 'rgba(135,135,135,0.5)'
                            }}
                        >
                            <IconButton style={{ position: 'absolute', top: '-4px', right: '-4px' }} tooltip="Delete" onClick={props.onDelete}>
                                <IconClose color={'#FFF'} />
                            </IconButton>
                            <IconButton style={{ position: 'absolute', top: '-4px', right: '-4px', color: '#FFF' }} tooltip="Delete" onClick={props.onDelete}>
                                <IconClose color={'#FFF'} />
                            </IconButton>
                        </div> : null}
                <img src={props.image} width="100%" height="auto" alt="error"/>
            </div>
        </Paper>
    )
}
export default ImageItem