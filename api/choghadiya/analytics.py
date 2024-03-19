from .constants import InputData, OutputData, Metadata, Prediction
from collections import Counter


def update_master_dict(master_dict, new_dict):
    for key, value in new_dict.items():
        if key in master_dict:
            for sub_key, sub_value in value.items():
                if sub_key in master_dict[key]:
                    for inner_key, inner_value in sub_value.items():
                        master_dict[key][sub_key][inner_key] = master_dict[key][sub_key].get(
                            inner_key, 0) + inner_value
                else:
                    master_dict[key][sub_key] = sub_value
        else:
            master_dict[key] = value


def create_counters(out: OutputData):
    muhurat_counts = Counter([b.choghadiya for b in out.prediction])
    drishyam_counts = Counter([b.drishyam for b in out.prediction])
    rahu_counts = Counter([b.rahu for b in out.prediction])
    return muhurat_counts, drishyam_counts, rahu_counts


async def analytics_update(analytics: dict, out: OutputData):
    mc, dc, rc = create_counters(out)
    idx = out.metadata.location
    new_dict = {}
    counts = {
        "muhurats": dict(mc),
        "drishyams": dict(dc),
        "rahus": dict(rc)
    }

    new_dict[idx] = counts

    if idx in analytics.keys():
        update_master_dict(analytics, new_dict)
    else:
        analytics[idx] = counts

    return analytics

async def run_analytics(analytics:dict):
    target = []

    for key, value in analytics.items():
        target.append({
            'name': key,
            'amrit': value['muhurats'].get("Amrit", 0),
            'kaal_ratri': value['muhurats'].get("Kaal", 0),
            'total_muh': sum(value['muhurats'].values()),
            'total_rahu': sum(value['rahus'].values()),
            'total_dri': sum(value['drishyams'].values()),
            'cnt_dri': sum([v for k, v in value['drishyams'].items() if k != ""]),
            'cnt_rahus': sum([v for k, v in value['rahus'].items() if k != ""]),
            'cnt_muh': sum([v for k, v in value['muhurats'].items() if k != ""]),
        })
    
    return target