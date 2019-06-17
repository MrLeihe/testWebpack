import logUtil from '@/utils/log'
import './style'
import './main'

logUtil.log('hello world!')
logUtil.log(NAME)
logUtil.log($().format())

console.log('NODE_ENV-------', process.env.NODE_ENV)