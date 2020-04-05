<?php

namespace app\controllers;

use app\models\Chat;
use phpDocumentor\Reflection\Types\Object_;

class ChatController extends \yii\web\Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionHistory($last_id) {
        $response = [
            'lastId' => $last_id,
            'messages' => ''
        ];

        $data = Chat::find()->where(['>', 'id', $response['lastId']])->orderBy(['id' => SORT_ASC])->all();

        if (!empty($data)) {
            $response ['data'] = $data;
            $response['lastId'] = $data[count($data)-1]['id'];
        }

        return $this->asJson($response);
    }

    public function actionMessage() {
        $request = \Yii::$app->request->post('message', false);

        $model = new Chat;
        $model->message = $request;
        $result = $model->save() ? 'success' : 'fail';

        return $this->asJson($result);
    }

}
