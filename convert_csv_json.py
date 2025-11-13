import pandas as pd

# Input and output files
csv_file = 'data/lista_imobile.csv'
json_file = 'data/output.json'

# Read CSV
df = pd.read_csv(csv_file, encoding='utf-8-sig')

# Keep only the columns you want and rename them
df = df.rename(columns={
    "Adresa": "address",
    "Anul construirii": "Anul_construirii",
    "Numar de apartamente": "Numar de apartamente",
    "Anul Elaborarii Expertizei Tehnice": "Anul Elaborarii Expertizei Tehnice",
    "Observatii": "Observatii"
})

# Keep only the selected columns
df = df[["address", "Anul_construirii", "Numar de apartamente", 
         "Anul Elaborarii Expertizei Tehnice", "Observatii"]]

# Replace missing values with None (so JSON will have null)
df = df.where(pd.notnull(df), None)

# Export to JSON Lines (one JSON object per line)
df.to_json(json_file, orient='records', lines=True, force_ascii=False)

print(f" Converted {csv_file} → {json_file} (JSON Lines format)")
