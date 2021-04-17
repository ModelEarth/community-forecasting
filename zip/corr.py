import pandas as pd

if __name__ == "__main__":
    data = pd.read_csv('30318_actual.csv')
    year = data['Year']
    data = data.drop(['Year', ' Working_Parttime', ' Working_Fulltime_Poverty', 'JobsAgriculture'], axis=1)
    # data.dropna(axis='columns')
    headers = data.columns.values
    correlation = data.corr()
    correlation.to_csv('30318_projected_actual.csv', sep=',', index=False)
    print('CSV saved')
