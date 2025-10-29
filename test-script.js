import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    /*stages: [
        { duration: '1m', target: 10 }, // ramp up
        { duration: '2m', target: 10 }, // steady load
        { duration: '30s', target: 0 }, // ramp down
    ],*/
    
    /*vus: 100, // 100 concurrent users
    duration: '1m', // each user runs for 2 minutes*/

    scenarios: {
        high_load: {
            executor: 'constant-arrival-rate',
            rate: 2500, // 500 requests per second
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 100, // pre-spawned VUs
            maxVUs: 20000, // cap for autoscaling VUs
        },
    },
};

export default function () {
    const res = http.get('http://$IP:8080/');
    sleep(0.1);
}
