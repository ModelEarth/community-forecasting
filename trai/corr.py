import pandas as pd

if __name__ == "__main__":
    data = pd.read_csv('30317_projected.csv')
    year = data['Year']
    data = data.drop(['Year'], axis=1)
    headers = data.columns.values
    correlation = data.corr()
    correlation.to_csv('correlation.csv', sep=',', index=False)
    print('Test')