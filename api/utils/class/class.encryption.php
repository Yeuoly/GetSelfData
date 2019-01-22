<?php
    class SRMEncode
    {
        static private $phoneKeyBoard = array(
            array(' ' => 1,'0' =>2 ,'q'=>3,'.' => 4, '[' => 5,'>' => 6,'(' => 7,'A'=>8,'Z'=>9,'I'=>0),
            array('1' => 1,']' =>2 ,'{'=>3,'}' => 4,'\\' => 5,'<' => 6,')' => 7,'Q'=>8,'Y'=>9,'H'=>0),
            array('f' => 1,'e' =>2 ,'c'=>3,'2' => 4, '|' => 5,'~' => 6,':' => 7,'B'=>8,'X'=>9,'P'=>0),
            array('h' => 1,'k' =>2 ,'i'=>3,'6' => 4,'-' => 5,'$' =>  6,'\'' => 7,'W'=>8,'E'=>9,'O'=>0),
            array('d' => 1,'b' =>2 ,'a'=>3,'3' => 4,'+' => 5,'#' =>  6,';' => 7,'D'=>8,'F'=>9,'J'=>0),
            array('j' => 1,'o' =>2 ,'l'=>3,'s' => 4,'*' => 5,'@' =>  6,'"' => 7,'C'=>8,'R'=>9,'N'=>0),
            array('t' => 1,'n' =>2 ,'g'=>3,'4' => 4,'/' => 5,'^' =>  6,'=' => 7,'V'=>8,'K'=>9,'[]'=>0),
            array('m' => 1,'w' =>2 ,'v'=>3,'5' => 4,'7' => 5,'%' =>  6,'_' => 7,'U'=>8,'S'=>9,'G'=>0),
            array('p' => 1,'u' =>2 ,'r'=>3,'8' => 4,'?' => 5,'!' =>  6,'\r' => 7,'T'=>8,'M'=>9,'[]'=>0),
            array(',' => 1,'x' =>2 ,'y'=>3,'z' => 4,'9' => 5,'&' =>  6,'\n' => 7,'`'=>8,'L'=>9,'\t'=>0),
        );

        static private $charBoard = array(
              '-' ,  'W' , 'v' , 'U' , 'y' ,'d' , 'c' ,
	          'a' ,  'R' , 'o' , 'N' , 'l' ,'i' , 'J' ,
	          'z' ,  'x' , 'f' , 'E' , 't' ,'B' , 's' ,
	          'Q' ,  'P' , 'm' , 'G' , 'h' ,'K' , 'w' ,
	          'V' ,  'u' , 'Y' , 'D' , 'C' ,'A' , 'r' ,
	          'O' ,  'n' , 'L' , 'I' , 'j' ,'Z' , 'X' ,
	          'F' ,  'e' , 'T' , 'b' , 'S' ,'q' , 'p' ,
	          'M' ,  'g' , 'H' , 'k' 
        );

        static protected function strSearcher($bindRandrom,$target){
            foreach(self::$phoneKeyBoard as $key =>$v){
                if(array_key_exists($target,$v)){
                    return $bindRandrom[$key]*10+self::$phoneKeyBoard[$key][$target];
                }
            }
        }

        static public function encode($src,$offset = 0)
        {
            srand(time());
            //create a array of random|TransForm
            $bindRandrom = array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1);
            foreach($bindRandrom as $key => $v){
                while(true){
                    $random = rand(0,9);
                    if(!in_array($random,$bindRandrom)){
                        $bindRandrom[$key] = $random;
                        break;
                    }
                }
            }
            $encrypt_result = "";
            $encrypt_temp_1 = array();
            for($i = 0 ; $i < 5 ; $i++){
                array_push($encrypt_temp_1,$bindRandrom[$i*2]*10+$bindRandrom[$i*2+1]);
            }
            $encrypt_temp_2 = "";
            //first edition
            foreach(str_split($src) as $key => $val){
                array_push($encrypt_temp_1,self::strSearcher($bindRandrom,$val));
            }
            //second edition
            foreach($encrypt_temp_1 as $key => $v){
                $temp_char_max_value = 52;
                $temp_char_min_value = 0;
                if($v < 52)$temp_char_max_value = $v;
                if($v > 52)$temp_char_min_value = $v - 52;
                $temp_char_1 = rand($temp_char_min_value,$temp_char_max_value);
                $temp_char_2 = $v - $temp_char_1;
                $encrypt_temp_2 .= self::$charBoard[$temp_char_1].self::$charBoard[$temp_char_2];
            }
            $encrypt_result .= $encrypt_temp_2;
            $str_catcher_right = substr($encrypt_result,0,$offset);
            $str_catcher_left = substr($encrypt_result,$offset);
            return $str_catcher_left.$str_catcher_right;
        }

        static public function decode($src,$offset)
        {
            $str_len = strlen($src);
            $str_catcher_left = substr($src,0,$str_len-$offset);
            $str_catcher_right = substr($src,$str_len-$offset);
            $src = $str_catcher_right.$str_catcher_left;
            $decrypt_temp_1 = str_split($src,2);
            $decrypt_result = "";
            $bindRandom = "";
            foreach($decrypt_temp_1 as $key=>$v){
                $temp_str = str_split($v);
                $decrypt_char_1 = array_search($temp_str[0],self::$charBoard);
                $decrypt_char_2 = array_search($temp_str[1],self::$charBoard);
                $total_value = $decrypt_char_1 + $decrypt_char_2;
                $decrypt_temp_1[$key] = array(intval($total_value / 10), $total_value % 10);
            }
            foreach($decrypt_temp_1 as $key => $v){
                if($key < 5)
                    $bindRandom .= $v[0].$v[1];
                else{
                    if($key == 5)
                        $bindRandom = str_split($bindRandom);
                    $index = array_search($v[0],$bindRandom);
                    $decrypt_result .= array_search($v[1],self::$phoneKeyBoard[$index]);
                }
            }
            return $decrypt_result;
        }
    }
    