import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { OkFace, AngryFace, WoundUpFace } from "./BearIcons";

export default class ExampleOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHead: ['Date', 'Time', 'Before', 'After'],
      tableData: [
        ['10 Oct. 2017', '10:53', <WoundUpFace />, <OkFace />],
        ['3 Mar. 2016', '20:44', <AngryFace />, <OkFace />],
        ['19 Jun. 2015', '03:14', <AngryFace />, <AngryFace />],
        ['20 Jun 2014', '08:10', <WoundUpFace />, <OkFace />]
      ]
    }
  }

  render() {
    const state = this.state;
    return (
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign: "center" }
});