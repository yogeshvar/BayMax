case $1 in 
    "reddit")
        python src/process_data.py --input_path dataset/reddit/emotional-reactions-reddit.csv --output_path dataset/preprocessed/reddit/reddit_model_ER.csv
        python src/process_data.py --input_path dataset/reddit/explorations-reddit.csv --output_path dataset/preprocessed/reddit/reddit_model_EX.csv
        python src/process_data.py --input_path dataset/reddit/interpretations-reddit.csv --output_path dataset/preprocessed/reddit/reddit_model_IP.csv
        ;;
    "baymax")
        python src/process_data.py --input_path dataset/emotional-reactions-baymax.csv --output_path dataset/preprocessed/baymax/baymax_model_ER.csv
        python src/process_data.py --input_path dataset/explorations-baymax.csv --output_path dataset/preprocessed/baymax/baymax_model_EX.csv
        python src/process_data.py --input_path dataset/interpretations-baymax.csv --output_path dataset/preprocessed/baymax/baymax_model_IP.csv
        ;;
    "*")
        python src/process_data.py --input_path dataset/sample_input_ER.csv --output_path dataset/preprocessed/sample/sample_model_ER.csv
        python src/process_data.py --input_path dataset/sample_input_EX.csv --output_path dataset/preprocessed/sample/sample_model_EX.csv
        python src/process_data.py --input_path dataset/sample_input_IP.csv --output_path dataset/preprocessed/sample/sample_model_IP.csv
        ;;    
esac
