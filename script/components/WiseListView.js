import React, {
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

let noop = () => undefined;
/*
 * 渲染list需要的东西:
 *    数据
 *    renderRow方法
 *    当前状态: 初始loading, refreshLoading, moreLoading
 * **注意:** 不做状态管理, 不需要传怎样refresh, 怎样loadMore,
 *            不需要他们是promise然后自己控制resolve后做数据append
 * 能注册的方法: pullRefreshHandler, endReachHandler
 *
 */
var WistLitView = React.createClass({
  getDefaultProps() {
    return {
      rowData: [],
      loading: true,
      refreshLoading: false,
      moreLoading: false,
      pullRefreshHandler: noop,
      endReachHandler: noop
    };
  },
  propsTypes: {
    rowData: PropTypes.array,          // 数据
    renderRow: PropTypes.func.isRequired,         // 渲染每行的方法
    loading: PropTypes.bool,           // 初始loading
    refreshLoading: PropTypes.bool,    // 刷新loading
    moreLoading: PropTypes.bool,       // 加载更多loading
    pullRefreshHandler: PropTypes.func,   // 下拉刷新时的处理函数
    endReachHandler: PropTypes.func   // 到底部的处理函数
  },
  getInitialState() {
    this.listDS = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1.id !== r2.id)
    });
    return {
      // dataSource: this.state.dataSource.cloneWithRows(this.props.rowData)
    };
  },
  componentDidMount() {
    console.log('wise list monted');
  },
  renderLoading: function(){
    return <Text style={styles.loadingText}>Loading...</Text>;
  },
  renderMoreLoading(moreLoading) {
    return moreLoading? (<Text style={styles.loadingText}>Loading...</Text>)
      :
    undefined;
  },
  render: function(){
    let {listDS, props} = this;
    console.log(props.rowData);
    let datasource = listDS.cloneWithRows(props.rowData);
    return (
      <View style={styles.listCtn}>
        <ListView
          initialListSize = {2}
          pageSize = {4}
          dataSource = {datasource}
          renderRow = {props.renderRow}
          onEndReached = {props.endReachHandler}
        >
        </ListView>
        {this.renderMoreLoading(props.moreLoading)}
      </View>
    );
  },
});


var styles = StyleSheet.create({
  listCtn: {
    flex: 1
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'rgba(255,255,255,0.8)'
  }
});

export default WistLitView;
