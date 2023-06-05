INSTANCE_ID="$(aws ec2 describe-instances --query 'Reservations[].Instances[].InstanceId' --output text)"
echo "Instance ID: $INSTANCE_ID"
aws ec2 start-instances --instance-ids $INSTANCE_ID

# Wait for instance to start
aws ec2 wait instance-running --instance-ids $INSTANCE_ID

IP="$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[].Instances[].PublicIpAddress' --output text)"
echo "Public IP: $IP"
