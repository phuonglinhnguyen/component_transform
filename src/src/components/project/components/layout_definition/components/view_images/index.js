import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

import IconInfo from 'material-ui/svg-icons/action/info-outline';

import Draw from '../../../../../common/canvas/components/draw/canvas_component';

import FileUploader from '../upload_file_component';

import ImageList from './image_list';
import ImageItem from './image_item';

class ViewImage extends Component {
    state = {
        open: false,
    }
    static propTypes = {
        images: PropTypes.arrayOf(PropTypes.object),
        shapes: PropTypes.arrayOf(PropTypes.object),
        imageSelectIndex: PropTypes.number,
        shapeSelectIndex: PropTypes.number,
        addShape: PropTypes.func,
        onSelectShape: PropTypes.func,
        onDeleteShape: PropTypes.func,
        onImageLoad: PropTypes.func
    };
    static defaultProps = {
        images: [],
        shapes: [],
        imageSelectIndex: 0,
        shapeSelectIndex: 0,
        addShape: () => undefined,
        onSelectShape: () => undefined,
        onDeleteShape: () => undefined,
        onImageLoad: () => undefined
    };
    renderImage() {
        const {
            width,
            height,
            shapes,
            onImageLoad,
            addShape,
            onSelectShape,
            updateSizeShape,
            onDeleteShape,
            completeDraw,
            shapeSelectIndex,
            images,
            imageSelectIndex,
        } = this.props;
        let _shapes = shapes || [];
        let _selectedShape = _shapes[shapeSelectIndex];
        if (images[imageSelectIndex]) {
            let image = images[imageSelectIndex].data;
            return (
                <Draw
                    type="layout_definition"
                    widthCanvas={width}
                    heightCanvas={height}
                    shapes={_shapes}
                    select_shape={_selectedShape}
                    select_index={shapeSelectIndex}
                    addShape={addShape}
                    selectShape={onSelectShape}
                    updateSizeShape={updateSizeShape}
                    deleteShape={onDeleteShape}
                    completeDraw={completeDraw}
                    imageUrl={image}
                />
            );
        } else {
            return (
                <div
                    style={{
                        width: '100%',
                        height: '180px',
                        position: 'absolute',
                        top: '50%'
                    }}
                >
                    <FileUploader
                        style={{
                            position: 'absolute',
                            top: -60,
                            left: 'calc(50% - 28px)'
                        }}
                        onFileLoad={file => onImageLoad(file)}
                    />
                    <div
                        style={{
                            width: 'calc(100% - 32px',
                            height: '158px',
                            position: 'relative',
                            padding: '16px',
                            textAlign: 'center'
                        }}
                    >
                        <span style={{ color: 'rgba(0,0,0,0.36)' }}>
                            <span>UPLOAD IMAGE SAMPLE</span>
                        </span>
                    </div>
                </div>
            );
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.open && nextProps.images.length === 0) {
            this.setState({ open: !1 })
        }
    }

    handleOpenImages() {
        this.setState({ open: !this.state.open });
    }
    render() {
        const {
            images,
            onImageLoad,
            imageSelectIndex,
            onSelectImage,
            onDeleteImage,
         } = this.props;
        const { open } = this.state;
        return (
            <Paper
                zDepth={1}
                style={{
                    width: 'calc(100%)',
                    height: 'calc(100%)',
                    position: 'relative',
                }}
            >
                <div style={{
                    width: 'calc(100%)',
                    height: 'calc(100%)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>

                    {images.length > 0 && !open ?
                        <IconButton style={{ position: 'absolute', top: '5px', right: '7px',zIndex:100 }} tooltip="Images" onClick={this.handleOpenImages.bind(this)}>
                            <IconInfo />
                        </IconButton>
                        : null}
                    <ImageList
                        openSecondary={true}
                        open={open}
                        inside={true}
                        swipeAreaWidth={30}
                        width={170}
                        containerStyle={{ backgroundColor: 'rgba(255,255,255,1)' }}
                        onClose={this.handleOpenImages.bind(this)}
                        onImageLoad={file => onImageLoad(file)}
                    >
                        <div style={{ width: '100%', overflowY: 'auto', height: 'calc(100% - 82px)', marginTop: 16 }}>
                            {images.map((image, index) => {
                                return <ImageItem key={index} title={image.fileName} selected={index === imageSelectIndex} image={image.data} leftIcon={<IconButton />}
                                    onSelect={() => {
                                        onSelectImage(index);
                                    }}
                                    onDelete={() => onDeleteImage(index)}
                                />;
                            })}
                        </div>
                    </ImageList>
                    {this.renderImage()}
                </div>
            </Paper>
        );
    }
}
export default ViewImage;
