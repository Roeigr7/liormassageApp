export const calendarTheme = {
  'stylesheet.calendar.header': {
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderBottomWidth: 2,
      borderBottomColor: '#1d2731',
    },
    headerContainer: {
      flexDirection: 'row',
    },
    monthText: {
      fontFamily: 'heebo',
      margin: 6,
      color: 'white',
      fontSize: 18,
    },
    arrow: {
      paddingHorizontal: 40,
    },
    arrowImage: {
      tintColor: '#d9b310',
    },
    disabledArrowImage: {
      tintColor: 'green',
    },
    week: {
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.1)',
      paddingTop: 5,
      paddingBottom: 3,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: 7,
      width: 32,
      textAlign: 'center',
      color: 'white',
    },
    disabledDayHeader: {},
  },
  'stylesheet.calendar.main': {
    container: {
      backgroundColor: 'transparent',
    },
    dayContainer: {
      flex: 1,
      alignItems: 'center',
    },
    emptyDayContainer: {
      flex: 1,
    },
    monthView: {
      backgroundColor: 'transparent',
    },
    week: {
      marginTop: 0,
      marginBottom: 7,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
  'stylesheet.day.basic': {
    base: {
      width: 28,
      height: 28,
      alignItems: 'center',
    },
    text: {
      fontSize: 14,
      marginTop: Platform.OS === 'android' ? 4 : 6,
      backgroundColor: 'transparent',
      color: '#eaeaea',
    },
    alignedText: {
      marginTop: Platform.OS === 'android' ? 4 : 6,
    },
    selected: {
      backgroundColor: '#d9b310',
      borderRadius: 5,
      color: 'black',
    },
    today: {},
    todayText: {
      color: '#d9b310',
    },
    selectedText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
    disabledText: {
      color: 'rgba(255,255,255,0.2)',
    },
  },
  'stylesheet.dot': {
    dot: {
      width: 2,
      height: 2,
      marginTop: 0,
      top: 0,
      marginHorizontal: 0,
      borderRadius: 1,
      opacity: 0,
    },
  },
};
