import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import { ACTION_CREATE } from '../constant';
import AutoSizer from '../../../../common/layout/auto_size_decorator';
import GridHeader from './layout_grid_header_component';
import { isEqual } from 'lodash';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
class LayoutList extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  state = {
    items: [],
    keySearch: ''
  };
  static propsTypes = {
    actions: PropTypes.object,
    items: PropTypes.array
  };
  static defaultProps = {
    items: [],
    onClone:()=>undefined
  };
  shouldComponentUpdate(nextProps) {
    return (!isEqual(this.props, nextProps));
  }
  handleEditLayout(layout) {
    const { history, redirect_url } = this.props;
    let action = layout ? layout.id : ACTION_CREATE;
    history.push(`${redirect_url}/${action}`);
  }
  handleAddLayout() {
    const { history, redirect_url } = this.props;
   history.push(`${redirect_url}/${ACTION_CREATE}`);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown, false);
    this.setState({ items: [] });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.items });
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, false);
    this.setState({ items: this.props.items });
  }

  handleKeyDown(e) {
    const { selectedId, items, onDelect } = this.props;
    if (e.keyCode === 46) {
      if (selectedId) {
        const item = items.filter(_item => _item.id === selectedId)[0];
        onDelect(item);
      }
    }
  }

  handleMenu = (event, objectItem) => {
    const { selectedId, items, onDelect, onClone } = this.props;
    switch (objectItem.props.value) {
      case 'clone':
        if (selectedId) {
          const item = items.filter(_item => _item.id === selectedId)[0];
          onClone(item, selectedId);
        }
        break;
      case 'remove':
        if (selectedId) {
          const item = items.filter(_item => _item.id === selectedId)[0];
          onDelect(item);
        }
        break;
      default:
        break;
    }
  }
  onSearch(value) {
    const { items } = this.props;
    this.setState({ keySearch: value });
    let search = new RegExp(value, 'i');
    let itemsSearched = items.filter(item => item.name.match(search));
    this.setState({ items: itemsSearched });
  }
  getLoading = (padding) => {
    return (
      <Paper
        style={{
          width: `calc(100% - ${padding}px)`,
          height: 'calc(100%)',
          position: 'relative',
          display: 'block',
          margin: `${0}px ${0}px ${0}px ${padding / 2}px`
        }}
        zDepth={1}
      >
        <div
          style={{
            width: '100%',
            height: 'calc(100%)',
            position: 'absolute',
            display: 'block',
            top: 0,
            left: 0,
            zIndex: 10,
            overflow: 'visible',
            background: 'rgba(115,115,115,0.75)',
          }}
        >
          <p style={{ marginTop: 'calc(50%)', marginLeft: 'calc(50% - 30px)', color: 'white' }} >Loading...</p>
        </div>
      </Paper>);

  }
  getItems(padding) {
    const { sections, selectedId, onSelect, deleting, cloning } = this.props;
    const { items } = this.state;
    return items.map(item => {
      let isDeleting = deleting[item.id];
      let isCloning = cloning[item.id];
      
      let noSection = item.sections,
        noField = item.fields;
      const section = sections[item.id] || {};

      return (
        <Paper
          key={item.id}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            !isDeleting &&
              onSelect(item.id);
          }}
          style={{
            width: `calc(100% - ${padding}px)`,
            height: 'calc(100%)',
            position: 'relative',
            display: 'block',
            margin: `${0}px ${0}px ${0}px ${padding / 2}px`
          }}
          zDepth={selectedId === item.id ? 3 : 1}
        >
          <div
            style={{
              width: '100%',
              height: 'calc(100%)',
              position: 'absolute',
              display: isDeleting||isCloning  ? 'block' : 'none',
              top: 0,
              left: 0,
              zIndex: 100,
              overflow: 'visible',
              background: 'rgba(115,115,115,0.75)',
            }}
          >
            <p style={{ marginTop: 'calc(50%)', marginLeft: 'calc(50% - 30px)', color: 'white' }} >{isCloning?"Cloning...":"Deleting..."}</p>
          </div>
          <div style={{ position: 'absolute', top: -4, right: -4, zIndex: 5 }}>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              onItemClick={this.handleMenu}
            >
              <MenuItem value='clone' primaryText="Clone" />
              <MenuItem value='remove' primaryText="Remove" />
            </IconMenu>
          </div>
          <div
            style={{
              width: '100%',
              height: 'calc(100% - 110px)',
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(255,205,125,0.5)'
            }}
          >
            <img src={item.sample_image && item.sample_image.data ? item.sample_image.data : item.sample_image || ''} alt="" width="100%" height="auto" />
          </div>
          <div
            style={{
              width: '100%',
              height: '110px',
              position: 'relative',
              background: 'rgba(0,0,0,0)'
            }}
          >
            <FloatingActionButton
              mini={true}
              style={{ position: 'absolute', top: -18, right: 16, zIndex: 200 }}
              onClick={e => {
                this.handleEditLayout(item);
              }}
            >
              <ModeEdit />
            </FloatingActionButton>
            <div
              style={{
                width: 'calc(100% - 32px)',
                height: 'calc(100% - 32px)',
                position: 'relative',
                padding: '16px'
              }}
            >
              <h3>
                {item.name}
              </h3>
              {section.isFetching
                ? <CircularProgress />
                : <span style={{ color: 'rgba(0,0,0,0.36)' }}>
                  <span>{noSection} sections </span>,{' '}
                  <span>{noField} fields</span>
                </span>}
            </div>
          </div>
        </Paper>
      );
    });
  }
  render() {
    const { width, items, onSelect, loading } = this.props;
    const { keySearch } = this.state;
    let cols = Math.floor(width / 225);
    let padding = Math.floor((width - 225 * cols) / cols);
    return (
      <div
        onClick={() => {
          onSelect();
        }}
        onKeyDown={e => this.handleKeyDown(e)}
        style={{
          width: 'calc(100% - 16px)',
          height: 'calc(100% - 16px)',
          position: 'relative',
          paddingTop: 16,
          paddingLeft: 16,

          overflowX: 'hidden',
          overflowY: 'auto'
        }}
      >
        <GridHeader
          label_total="Layout available"
          keySearch={keySearch}
          total={items.length}
          onSearch={value => {
            this.onSearch(value);
          }}
        />
        <GridList
          cellHeight={225}
          cols={cols}
          style={{
            width: '100%',
            height: 'calc(100% - 50px)'
          }}
        >
          <GridTile key="new">
            <div
              style={{
                width: `calc(100% - ${padding + 4}px)`,
                height: 'calc(100% - 4px)',
                position: 'relative',
                display: 'block',
                border: '2px dashed rgba(0,0,0,0.5)',
                marginRight: `${padding / 2}px`
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '180px',
                  position: 'absolute',
                  top: '50%'
                }}
              >
                <FloatingActionButton
                  onClick={e => {
                    this.handleAddLayout();
                  }}
                  secondary={true}
                  style={{
                    position: 'absolute',
                    top: -60,
                    left: 'calc(50% - 28px)'
                  }}
                >
                  <ContentAdd />
                </FloatingActionButton>
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
                    <span>ADD NEW FORM</span>
                  </span>
                </div>
              </div>
            </div>
          </GridTile>
          {!loading ? this.getItems(padding) : this.getLoading(padding)}
        </GridList>
      </div>
    );
  }
}
export default AutoSizer(LayoutList);
