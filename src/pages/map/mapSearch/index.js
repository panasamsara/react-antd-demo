import React, { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import {
  Input,
  AutoComplete,
  Cascader,
  Card,
  List,
  Button,
  Pagination
} from "antd";
import "antd/dist/reset.css";
import {
  Amap,
  Marker,
  loadAmap,
  loadPlugins,
  usePlugins
} from "@amap/amap-react";

const noop = () => {};

function SearchBox(props) {
  const AMap = usePlugins(["AMap.AutoComplete", "AMap.DistrictSearch"]);
  const [options, setOptions] = useState([]);
  const ac = useMemo(() => {
    if (AMap) return new AMap.AutoComplete();
    else return null;
  }, [AMap]);

  const [cities] = usePromise(loadCities(), []);

  const handleSearch = (kw) => {
    if (!ac) return;
    if (!kw) {
      setOptions([]);
      return;
    }
    ac.search(kw, (status, result) => {
      if (status === "complete" && result.tips) {
        const uniq = new Set(result.tips.map((tip) => tip.name));
        setOptions(Array.from(uniq));
      } else {
        setOptions([]);
      }
    });
  };

  const onSelect = (value) => {
    const { onSearch = noop } = props;
    onSearch(value);
  };

  return (
    <div className="search-box">
      <Input.Group compact>
        <Cascader
          options={cities}
          value={props.city}
          onChange={(values) => {
            props.onCityChange && props.onCityChange(values);
          }}
          allowClear={false}
          placeholder="选择城市"
          style={{ width: 100 }}
          displayRender={(labels) =>
            labels.length > 0 ? labels[labels.length - 1] : ""
          }
        />
        <AutoComplete
          defaultValue={props.query}
          options={options.map((value) => ({
            value,
            label: <div>{value}</div>
          }))}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input.Search
            placeholder="输入“星巴克”试试"
            enterButton
            onSearch={onSelect}
          />
        </AutoComplete>
      </Input.Group>
    </div>
  );
}

function SearchResult(props) {
  const AMap = usePlugins(["AMap.PlaceSearch"]);
  const ps = useMemo(() => {
    if (AMap)
      return new AMap.PlaceSearch({
        city: "北京市"
      });
    else return null;
  }, [AMap]);
  const pageSize = 20;
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setPage(1);
    setTotal(0);
    setResults([]);
    if (ps && props.city) {
      ps.setCity(props.city);
    }
  }, [ps, props.query, props.city]);

  useEffect(() => {
    if (!ps) return;
    setStatus("searching");
    ps.setPageSize(pageSize);
    ps.setPageIndex(page);
    ps.search(props.query, (status, result) => {
      const { onResult = noop } = props;
      if (status === "complete" && result.poiList) {
        setStatus("success");
        setResults(result.poiList.pois);
        setTotal(result.poiList.count);
        onResult(result.poiList.pois);
      } else {
        setStatus("failed");
        setResults([]);
        setTotal(0);
        onResult([]);
      }
    });
  }, [ps, props.query, page]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderPagination = () => {
    if (total <= 0) return null;
    return (
      <Pagination
        simple
        size="small"
        current={page}
        pageSize={pageSize}
        total={total}
        onChange={(p) => setPage(p)}
      />
    );
  };

  return (
    <Card
      className="search-result"
      title={`共约 ${total} 条结果`}
      extra={
        <Button className="cancel-button" type="link" onClick={props.onClose}>
          返回
        </Button>
      }
      headStyle={{
        padding: "0 12px"
      }}
      bodyStyle={{
        maxHeight: "450px",
        overflowY: "scroll",
        padding: "0 12px 24px"
      }}
    >
      <List
        dataSource={results}
        loading={status === "searching"}
        renderItem={(poi) => (
          <List.Item
            onClick={() => props.onSelect && props.onSelect(poi)}
            style={{ cursor: "pointer" }}
          >
            <List.Item.Meta title={poi.name} description={poi.address} />
          </List.Item>
        )}
        header={renderPagination()}
        footer={renderPagination()}
      />
    </Card>
  );
}

export default function App() {
  const $map = useRef(null);
  const [mode, setMode] = useState("input");
  const [city, setCity] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hover, setHover] = useState(null);

  const clearSearch = () => {
    setResults([]);
    setHover(null);
  };
  const handleSearch = (query) => {
    setQuery(query);
  };

  return (
    <div className="App">
      <div className="map-container">
        <Amap ref={$map}>
          {mode === "input" && (
            <SearchBox
              query={query}
              onSearch={(query) => {
                clearSearch();
                handleSearch(query);
                setMode("result");
              }}
              city={city}
              onCityChange={setCity}
            />
          )}
          {mode === "result" && (
            <SearchResult
              city={city[city.length - 1]}
              query={query}
              onClose={() => {
                clearSearch();
                setMode("input");
              }}
              onResult={(results) => {
                setResults(results);
                if ($map.current) {
                  setTimeout(() => {
                    $map.current.setFitView(null, false, [40, 10, 310, 20]);
                  }, 100);
                }
              }}
              onSelect={(poi) => {
                setHover(poi);
                if ($map.current) {
                  $map.current.setZoomAndCenter(
                    17,
                    [poi.location.lng, poi.location.lat],
                    true
                  );
                }
              }}
            />
          )}

          {results.map((poi) => (
            <Marker
              key={poi.id}
              position={[poi.location.lng, poi.location.lat]}
              label={
                poi === hover
                  ? {
                      content: poi.name,
                      direction: "bottom"
                    }
                  : { content: "" }
              }
              zIndex={poi === hover ? 110 : 100}
              onMouseOver={() => setHover(poi)}
              onMouseOut={() => setHover(null)}
            />
          ))}
        </Amap>
      </div>
    </div>
  );
}

function usePromise(promise, defaultValue = undefined) {
  const [result, setResult] = useState(defaultValue);
  const [error, setError] = useState(null);

  promise.then(setResult, setError);

  return [result, error];
}

let _citiesPromise = null;
function loadCities() {
  if (!_citiesPromise) {
    _citiesPromise = loadAmap()
      .then(() => loadPlugins("AMap.DistrictSearch"))
      .then((AMap) => {
        const ds = new AMap.DistrictSearch({
          level: "country",
          subdistrict: 2
        });

        return new Promise((resolve) => {
          ds.search("中国", function (status, result) {
            const compare = (a, b) => {
              return parseInt(a.value, 10) - parseInt(b.value, 10);
            };
            const options = result.districtList[0].districtList.map(
              (province) => {
                const { adcode, name, districtList = [] } = province;
                const children = [
                  "北京市",
                  "天津市",
                  "上海市",
                  "重庆市"
                ].includes(name)
                  ? []
                  : districtList.map((city) => {
                      return {
                        value: city.adcode,
                        label: city.name
                      };
                    });
                children.sort(compare);
                return {
                  value: adcode,
                  label: name,
                  children
                };
              }
            );
            options.sort(compare);
            resolve(options);
          });
        });
      });
  }
  return _citiesPromise;
}
