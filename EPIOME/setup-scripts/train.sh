declare -a arr=("IP" "ER" "EX")
for i in "${arr[@]}"
do 
    case $1 in
        "reddit")
            python src/train.py \
                --train_path="dataset/preprocessed/reddit/reddit_model_${i}.csv" \
                --lr=2e-5 \
                --batch_size=32 \
                --lambda_EI=1.0 \
                --lambda_RE=0.5 \
                --do_test \
                --test_path="dataset/preprocessed/reddit/reddit_model_${i}.csv" \
                --save_model \
                --save_model_path="output/reddit_${i}.pth"
            ;;
        "baymax")
            python src/train.py \
                --train_path="dataset/baymax_model_${i}.csv" \
                --lr=2e-5 \
                --batch_size=32 \
                --lambda_EI=1.0 \
                --lambda_RE=0.5 \
                --do_validation \
                --dev_path="dataset/baymax_model_valid_${i}.csv" \
                --do_test \
                --test_path="dataset/baymax_model_test_${i}.csv" \
                --save_model \
                --save_model_path="output/baymax_${i}.pth"
            ;;
        "sample")
            python src/train.py \
                --train_path="dataset/sample_input_model_${i}.csv" \
                --lr=2e-5 \
                --batch_size=32 \
                --lambda_EI=1.0 \
                --lambda_RE=0.5 \
                --do_validation \
                --dev_path="dataset/sample_input_model_${i}.csv" \
                --do_test \
                --test_path="dataset/sample_input_model_${i}.csv" \
                --save_model \
                --save_model_path="output/sample_${i}.pth"
            ;;
        *)
            echo "Usage: ./train.sh [reddit|baymax|sample]"
            exit 1
            ;;
    esac
done