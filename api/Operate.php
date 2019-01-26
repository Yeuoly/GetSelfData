<?php
    include("utils/functions.php");
    $query = @$_POST['query'];
    $query_array;
    $usrinfo = GetLoginInfo();
    $out = array('msg'=>'','data'=>array('error'=>''));

    if($password_confirmation != $usrinfo[1])
    {
        $out['msg'] = constant("failed");
        $out['data']['error'] = constant("wrong_pswd");
    }
    else
    {
        if(!$query_array = @explode(' ',$query))
        {
            $out['msg'] = constant("failed");
            $out['data']['error'] = constant("wrong_query");
        }
        else switch($query_array[0])
        {
        case 'delete':
            if(count($query_array)<2)
            {
                $out['msg'] = constant("failed");
                $out['data']['error'] = constant("wrong_query");
            }
            else
            {
                $tot_count = count($query_array)-1;
                for($i = 0;$i < $tot_count ;$i++)
                {
                    if(!DeleteFromDataBase(constant("mysqli_db_manausr"),$usrinfo[0],$query_array[$i+1]))
                    {
                        $out['msg'] = constant("failed");
                        $out['data']['error'] = constant("failed_query");
                        break;
                    }
                }
                $out['msg'] = constant("success");
            }
            break;
        case 'set':
            if(count($query_array)!=4)
            {
                $out['msg'] = constant("failed");
                $out['data']['error'] = constant("wrong_query");
            }
            else if(!UpdateToDataBase(constant("mysqli_db_manausr"),$usrinfo[0],
                $query_array[1],$query_array[2],$query_array[3]))
            {
                $out['msg'] = constant("failed");
                $out['data']['error'] = constant("failed_query");
            }
            else $out['msg'] = constant("success");
            break;
        default:
            $out['msg'] = constant("failed");
            $out['data']['error'] = constant("wrong_query");
        }
    }
    echo json_encode($out);