#! /bin/bash
# 2-line script called when pushing artifacts to production after having passed the whole pipeline, incluing manual approval gates. 
echo "Installing serverless"
npm install -g serverless
npm install serverless-bundle serverless-pseudo-parameters serverless-aws-documentation serverless-mocha-plugin serverless-stack-output # we have to install the plugins specified in our serverless.yml to avoid errors, even though we won't be using them
echo "deploying app to $env ..."
serverless deploy --stage $env --package $CODEBUILD_SRC_DIR/artifacts/$env -v