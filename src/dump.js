// const onRefresh = useCallback(async () => {
//   setRefreshing(true);
//   setLoading(true);
//   setTimeout(() => {
//     setRefreshing(false);
//     setLoading(false);
//   }, 1000);
// }, []);

// async function resetCoordinates() {
//   try {
//     await AsyncStorage.removeItem('@lat');
//     await AsyncStorage.removeItem('@lng');
//   } catch (err) {
//     console.log(`cannot remove coords ${err}`);
//   }
// }
// resetCoordinates();

// const headerImg = require('../images/nero.jpg');

// <View style={styles.header}>
//  <Image source={headerImg} style={styles.img} />
// </View>;

// const [error, setError] = useState('');
// const [refreshing, setRefreshing] = useState(false);
