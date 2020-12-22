import React from 'react';
import * as Styled from '../styles/screens/Styled_HistoryScreen';
import {DataTable} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {Text, ScrollView} from 'react-native';

// Custom Hook
import useHistoryScreen from '../src/customHook/useHistoryScreen';

export default function HistoryScreen() {
  const {params} = useRoute();
  const [state] = useHistoryScreen(params);
  return (
    <React.Fragment>
      {/* <ScrollView> */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>User</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>

        {!state.isLoading ? (
          state.datas.map((elem) => (
            <DataTable.Row key={elem.id}>
              <DataTable.Cell>{elem.latestStatusBy}</DataTable.Cell>
              <DataTable.Cell style={{paddingLeft: 10}}>
                {elem.status ? 'Open' : 'Close'}
              </DataTable.Cell>
              <DataTable.Cell>{elem.latestStatus}</DataTable.Cell>
            </DataTable.Row>
          ))
        ) : (
          <Text>Loading...</Text>
        )}

        <DataTable.Pagination
          page={0}
          numberOfPages={3}
          onPageChange={(page) => {
            console.log(page);
          }}
          label="1-2 of 6"
        />
      </DataTable>
      {/* </ScrollView> */}
    </React.Fragment>
  );
}
